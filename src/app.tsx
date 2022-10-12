import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import PageLoading from './components/PageLoading';
import NotAuthorizedPage from './pages/403';
import { getCurrentUser as queryCurrentUser } from './services/ant-design-pro/api';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.UserInfo;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.UserInfo | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser({
        skipErrorHandler: true,
      });
      return msg.data;
    } catch (error) {
      // if (window.location.pathname !== loginPath) {
      //   history.push(loginPath);
      // }
      console.log('No user logged in');
    }
    return { role: 'GUEST' } as API.UserInfo;
  };
  // if (window.location.pathname !== loginPath) {
  //   const currentUser = await fetchUserInfo();
  //   return {
  //     fetchUserInfo,
  //     currentUser,
  //     settings: defaultSettings,
  //   };
  // }
  // return {
  //   fetchUserInfo,
  //   settings: defaultSettings,
  // };
  const currentUser = await fetchUserInfo();
  return {
    fetchUserInfo,
    currentUser,
    settings: defaultSettings,
  };
}

// ProLayout api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    // onPageChange: () => {
    //   const { location } = history;
    //   if (
    //     (!initialState?.currentUser || isCurrentUserLoggedOut()) &&
    //     location.pathname !== loginPath
    //   ) {
    //     setInitialState((s) => ({ ...s, currentUser: undefined }));
    //     history.push(loginPath);
    //   }
    // },
    layoutBgImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    menuHeaderRender: undefined,
    unAccessible: <NotAuthorizedPage />,
    childrenRender: (children, props) => {
      if (initialState?.loading) return <PageLoading />;
      else
        return (
          <>
            {children}
            {!props.location?.pathname?.includes('/login') && (
              <SettingDrawer
                disableUrlParams
                enableDarkTheme
                settings={initialState?.settings}
                onSettingChange={(settings) => {
                  setInitialState((preInitialState: any) => ({
                    ...preInitialState,
                    settings,
                  }));
                }}
              />
            )}
          </>
        );
    },
    ...initialState?.settings,
  };
};
