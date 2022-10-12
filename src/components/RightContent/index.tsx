import { QuestionCircleOutlined } from '@ant-design/icons';
import { history, SelectLang, useModel } from '@umijs/max';
import { Space } from 'antd';
import React from 'react';
import Avatar from './AvatarDropdown';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  const login = () => {
    history.push('/user/login');
  };

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <Space className={className}>
      <span
        className={styles.action}
        onClick={() => {
          window.open('https://hpcc.vn/');
        }}
      >
        <QuestionCircleOutlined />
      </span>
      {initialState.currentUser !== undefined && initialState.currentUser?.role !== 'GUEST' ? (
        <Avatar menu={true} />
      ) : !window.location.pathname.includes('/user/login') ? (
        <p className={styles.text} onClick={login}>
          Log in
        </p>
      ) : null}
      <SelectLang
        className={styles.action}
        getPopupContainer={(trigger: { parentNode: HTMLElement }) =>
          trigger.parentNode as HTMLElement
        }
      />
    </Space>
  );
};
export default GlobalHeaderRight;
