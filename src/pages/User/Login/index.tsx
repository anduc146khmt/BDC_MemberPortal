import {
  CONSTANTS_BEARER_TOKEN,
  CONSTANTS_EXPIRED_AT,
  CONSTANTS_REFRERSH_TOKEN,
  CONSTANTS_USER_ID,
} from '@/constants/local-storage-constants';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, PageContainer, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, history, useIntl, useModel } from '@umijs/max';
import { Alert, message } from 'antd';
import React, { useState } from 'react';
import { login } from './api';
import styles from './style.less';
import type { LoginParams, LoginResult } from './typings';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<LoginResult>({});
  const { initialState, setInitialState } = useModel('@@initialState');

  const intl = useIntl();

  const defaultLoginFailureMessage = intl.formatMessage({
    id: 'pages.login.failure',
  });

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo,
      }));
    }
  };

  console.log(initialState?.currentUser);

  if (initialState?.currentUser && initialState?.currentUser?.role !== 'GUEST') {
    history.push('/');
  }

  const handleSubmit = async (values: LoginParams) => {
    try {
      const msg = await login({ ...values });
      if (msg.code === 0) {
        message.success(
          intl.formatMessage({
            id: 'pages.login.success',
          }),
        );
        if (
          !msg.data ||
          !msg.data?.expired_at ||
          !msg.data?.token ||
          !msg.data?.refresh_token ||
          !msg.data?.user_id
        ) {
          message.error(defaultLoginFailureMessage);
          return;
        } else {
          localStorage.setItem(CONSTANTS_EXPIRED_AT, msg.data?.expired_at);
          localStorage.setItem(CONSTANTS_BEARER_TOKEN, msg.data?.token);
          localStorage.setItem(CONSTANTS_REFRERSH_TOKEN, msg.data?.refresh_token);
          localStorage.setItem(CONSTANTS_USER_ID, msg.data?.user_id);

          await fetchUserInfo();

          await waitTime(50);
          const urlParams = new URL(window.location.href).searchParams;
          history.push(urlParams.get('redirect') || '/');
          return;
        }
      }
      setUserLoginState(msg);
    } catch (error) {
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  const { code } = userLoginState;

  return (
    <PageContainer className={styles.container} title={false}>
      <div className={styles.content}>
        <div className={styles.form}>
        <LoginForm
          logo={<img alt="logo" src="/logo.svg" />}
          title="Member Portal"
          subTitle="Welcome to Big Data Club"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as LoginParams);
          }}
          submitter={{
            searchConfig: {
              submitText: intl.formatMessage({
                id: 'pages.login.submit',
              }),
            },
          }}
        >
          <div className={styles.title}>
            Username
          </div>

          {code && code < 0 && (
            <LoginMessage
              content={intl.formatMessage({
                id: 'pages.login.accountLogin.errorMessage',
              })}
            />
          )}
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={styles.prefixIcon} />,
            }}
            placeholder={intl.formatMessage({
              id: 'pages.login.username.placeholder',
            })}
            rules={[
              {
                required: true,
                message: <FormattedMessage id="pages.login.username.required" />,
              },
            ]}
          />
          <div className={styles.title}>
            Password
          </div>
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={styles.prefixIcon} />,
            }}
            placeholder={intl.formatMessage({
              id: 'pages.login.password.placeholder',
            })}
            rules={[
              {
                required: true,
                message: <FormattedMessage id="pages.login.password.required" />,
              },
            ]}
          />

          <div
            style={{
              marginBottom: "24px",
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              <FormattedMessage id="pages.login.rememberMe" />
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              <FormattedMessage id="pages.login.forgotPassword" />
            </a>
          </div>
        </LoginForm>
        </div>
      </div>
    </PageContainer>
  );
};

export default Login;
