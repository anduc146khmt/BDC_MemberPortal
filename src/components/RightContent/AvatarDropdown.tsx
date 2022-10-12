import {
  CONSTANTS_BEARER_TOKEN,
  CONSTANTS_EXPIRED_AT,
  CONSTANTS_REFRERSH_TOKEN,
  CONSTANTS_USER_ID,
} from '@/constants/local-storage-constants';
import { outLogin } from '@/services/ant-design-pro/api';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { history, useAccess, useIntl, useModel } from '@umijs/max';
import { Avatar, Menu, Spin } from 'antd';
import type { ItemType } from 'antd/lib/menu/hooks/useItems';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const loginOut = async () => {
  localStorage.removeItem(CONSTANTS_BEARER_TOKEN);
  localStorage.removeItem(CONSTANTS_REFRERSH_TOKEN);
  localStorage.removeItem(CONSTANTS_EXPIRED_AT);
  localStorage.removeItem(CONSTANTS_USER_ID);
  try {
    await outLogin();
  } catch (error) {
    console.log('Server error: ' + error);
  }

  const { search, pathname } = window.location;
  const urlParams = new URL(window.location.href).searchParams;
  const redirect = urlParams.get('redirect');
  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname + search,
      }),
    });
  }
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const intl = useIntl();

  const { initialState, setInitialState } = useModel('@@initialState');

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        setInitialState((s) => ({ ...s, currentUser: { role: 'GUEST' } as API.UserInfo }));
        loginOut();
        return;
      }
      history.push(`/${key}`);
    },
    [setInitialState],
  );

  const access = useAccess();
  if (access.canView) {
    console.log('canView');
  } else {
    console.log('can not View');
  }

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.name) {
    return loading;
  }

  const menuItems: ItemType[] = [
    ...(menu
      ? [
          {
            key: 'account',
            icon: <UserOutlined />,
            label: intl.formatMessage({
              id: 'component.globalHeader.account',
            }),
          },
          {
            key: 'settings',
            icon: <SettingOutlined />,
            label: intl.formatMessage({
              id: 'component.globalHeader.settings',
            }),
          },
          {
            type: 'divider' as const,
          },
        ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
    },
  ];

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick} items={menuItems} />
  );

  return (
    <HeaderDropdown
      overlay={menuHeaderDropdown}
      getPopupContainer={(trigger) => trigger.parentNode as HTMLElement}
    >
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          src={
            currentUser.avatar ||
            'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
          }
          alt="avatar"
        />
        <span className={`${styles.name} anticon`}>{currentUser.name}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
