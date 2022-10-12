// https://umijs.org/config/
import { defineConfig } from '@umijs/max';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

export default defineConfig({
  /**
   * @doc https://umijs.org/docs/api/config#hash
   */
  hash: true,

  /**
   * @doc https://umijs.org/docs/api/config#targets
   */
  // targets: {
  //   ie: 11,
  // },
  /**
   * @doc https://umijs.org/docs/guides/routes
   */
  // umi routes: https://umijs.org/docs/routing
  routes,
  /**
   * @doc https://ant.design/docs/react/customize-theme-cn
   * @doc https://umijs.org/docs/api/config#theme
   */
  theme: {
    'root-entry-name': 'variable',
  },
  /**
   * @doc https://umijs.org/docs/api/config#ignoremomentlocale
   */
  ignoreMomentLocale: true,
  /**
   * @doc https://umijs.org/docs/guides/proxy
   * @doc https://umijs.org/docs/api/config#proxy
   */
  proxy: proxy,
  fastRefresh: true,
  /**
   * @@doc https://umijs.org/docs/max/data-flow
   */
  model: {},
  /**
   * @doc https://umijs.org/docs/max/data-flow#%E5%85%A8%E5%B1%80%E5%88%9D%E5%A7%8B%E7%8A%B6%E6%80%81
   */
  initialState: {},
  /**
   * @doc https://umijs.org/docs/max/layout-menu
   */
  layout: {
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  /**
   * @doc https://umijs.org/docs/max/i18n
   */
  locale: {
    default: 'en-US',
    antd: true,
    baseNavigator: true,
  },
  /**
   * @doc https://umijs.org/docs/max/antd#antd
   */
  antd: {
    dark: true,
    compact: true,
  },
  /**
   * @doc https://umijs.org/docs/max/request
   */
  request: {},
  /**
   * @doc https://umijs.org/docs/max/access
   */
  access: {},
  presets: ['umi-presets-pro'],
});
