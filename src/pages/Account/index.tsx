import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Menu } from 'antd';
import React, { useLayoutEffect, useRef, useState } from 'react';
import BaseView from './components/base';
import BindingView from './components/binding';
import SecurityView from './components/security';
import styles from './style.less';

const { Item } = Menu;

type SettingsStateKeys = 'base' | 'security' | 'binding';
type SettingsState = {
  mode: 'inline' | 'horizontal';
  selectKey: SettingsStateKeys;
};

const Profile: React.FC = () => {
  const intl = useIntl();

  const menuMap: Record<string, React.ReactNode> = {
    base: intl.formatMessage({
      id: 'account.profile.detail',
    }),
    security: intl.formatMessage({
      id: 'account.profile.security',
    }),
    binding: intl.formatMessage({
      id: 'account.profile.binding',
    }),
  };

  const [initConfig, setInitConfig] = useState<SettingsState>({
    mode: 'inline',
    selectKey: 'base',
  });
  const dom = useRef<HTMLDivElement>();

  const resize = () => {
    requestAnimationFrame(() => {
      if (!dom.current) {
        return;
      }
      let mode: 'inline' | 'horizontal' = 'inline';
      const { offsetWidth } = dom.current;
      if (dom.current.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      setInitConfig({ ...initConfig, mode: mode as SettingsState['mode'] });
    });
  };

  useLayoutEffect(() => {
    if (dom.current) {
      window.addEventListener('resize', resize);
      resize();
    }
    return () => {
      window.removeEventListener('resize', resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dom.current]);

  const getMenu = () => {
    return Object.keys(menuMap).map((item) => <Item key={item}>{menuMap[item]}</Item>);
  };

  const renderChildren = () => {
    const { selectKey } = initConfig;
    switch (selectKey) {
      case 'base':
        return <BaseView />;
      case 'security':
        return <SecurityView />;
      case 'binding':
        return <BindingView />;
      default:
        return null;
    }
  };

  return (
    <PageContainer title={false}>
      <div
        className={styles.main}
        ref={(ref) => {
          if (ref) {
            dom.current = ref;
          }
        }}
      >
        <div className={styles.leftMenu}>
          <Menu
            mode={initConfig.mode}
            selectedKeys={[initConfig.selectKey]}
            onClick={({ key }) => {
              setInitConfig({
                ...initConfig,
                selectKey: key as SettingsStateKeys,
              });
            }}
          >
            {getMenu()}
          </Menu>
        </div>
        <div className={styles.right}>{renderChildren()}</div>
      </div>
    </PageContainer>
  );
};
export default Profile;
