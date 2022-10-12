import { UploadOutlined } from '@ant-design/icons';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { useIntl, useModel } from '@umijs/max';
import { Button, message, Spin, Upload } from 'antd';
import React from 'react';
import { updateUserProfile } from '../api';
import type { UpdateProfileParams } from '../data';

import styles from './BaseView.less';

const AvatarView = ({ avatar }: { avatar: string }) => {
  const intl = useIntl();

  return (
    <>
      <div className={styles.avatar}>
        <img src={avatar} alt="avatar" />
      </div>
      <Upload showUploadList={false}>
        <div className={styles.button_view}>
          <Button>
            <UploadOutlined />
            {intl.formatMessage({
              id: 'account.profile.changeavatar',
            })}
          </Button>
        </div>
      </Upload>
    </>
  );
};

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

const BaseView: React.FC = () => {
  const intl = useIntl();

  const { initialState, setInitialState } = useModel('@@initialState');

  if (!initialState) {
    return loading;
  }

  const currentUser = initialState.currentUser;

  if (!currentUser) {
    return loading;
  }

  const getAvatarURL = () => {
    if (currentUser.avatar) {
      return currentUser.avatar;
    }
    const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
    return url;
  };

  const handleFinish = async (values: UpdateProfileParams) => {
    try {
      const response = await updateUserProfile({ ...values });
      if (response.code === 0) {
        message.success(
          intl.formatMessage({
            id: 'account.profile.success',
          }),
        );
        // Update initial state
        setInitialState((s) => ({ ...s, currentUser: response.data }));
      } else {
        message.error(
          intl.formatMessage({
            id: 'account.profile.error',
          }) +
            ': ' +
            response.message,
        );
      }
    } catch (error) {
      message.error(
        intl.formatMessage({
          id: 'account.profile.error',
        }),
      );
    }
  };

  return (
    <div className={styles.baseView}>
      <>
        <div className={styles.left}>
          <ProForm
            layout="vertical"
            onFinish={async (values) => {
              await handleFinish(values as UpdateProfileParams);
            }}
            submitter={{
              searchConfig: {
                submitText: intl.formatMessage({
                  id: 'account.profile.submit',
                }),
              },
              render: (_, dom) => dom[1],
            }}
            initialValues={{
              ...currentUser,
            }}
            hideRequiredMark
          >
            <ProFormText
              width="md"
              name="name"
              label={intl.formatMessage({
                id: 'account.profile.name',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: 'account.profile.required.name',
                  }),
                },
              ]}
              placeholder={intl.formatMessage({
                id: 'account.profile.placeholder.name',
              })}
            />
            <ProFormText
              width="md"
              name="email"
              label={intl.formatMessage({
                id: 'account.profile.email',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: 'account.profile.required.email',
                  }),
                },
              ]}
              placeholder={intl.formatMessage({
                id: 'account.profile.placeholder.email',
              })}
            />

            <ProFormText
              width="md"
              name="address"
              label={intl.formatMessage({
                id: 'account.profile.address',
              })}
              placeholder={intl.formatMessage({
                id: 'account.profile.placeholder.address',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: 'account.profile.required.address',
                  }),
                },
              ]}
            />

            <ProFormText
              width="md"
              name="organization"
              label={intl.formatMessage({
                id: 'account.profile.organization',
              })}
              placeholder={intl.formatMessage({
                id: 'account.profile.placeholder.organization',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: 'account.profile.required.organization',
                  }),
                },
              ]}
            />

            <ProFormText
              width="sm"
              name="phone_number"
              label={intl.formatMessage({
                id: 'account.profile.phone',
              })}
              placeholder={intl.formatMessage({
                id: 'account.profile.placeholder.phone',
              })}
              rules={[
                {
                  required: true,
                  message: intl.formatMessage({
                    id: 'account.profile.required.phone',
                  }),
                },
              ]}
            />
          </ProForm>
        </div>
        <div className={styles.right}>
          <AvatarView avatar={getAvatarURL()} />
        </div>
      </>
    </div>
  );
};

export default BaseView;
