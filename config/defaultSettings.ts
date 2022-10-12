import { Settings as LayoutSettings } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'realDark',
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'AI Scheduling',
  pwa: false,
  logo: 'https://hpcc.vn/wp-content/uploads/2021/09/logo-light.png',
  iconfontUrl: '',
  headerHeight: 56,
};

export default Settings;
