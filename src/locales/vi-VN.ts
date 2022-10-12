import account from './en-US/account';
import dashboard from './en-US/dashboard';
import component from './vi-VN/component';
import globalHeader from './vi-VN/globalHeader';
import menu from './vi-VN/menu';
import pages from './vi-VN/pages';
import pwa from './vi-VN/pwa';
import settingDrawer from './vi-VN/settingDrawer';

export default {
  'navBar.lang': 'Ngôn ngữ',
  'layout.user.link.help': 'Trợ giúp',
  'layout.user.link.privacy': 'Chính sách',
  'layout.user.link.terms': 'Điều khoản',
  'app.copyright.produced': 'AI Scheduling Portal powered by High Performance Computing Lab',
  'app.preview.down.block': 'downblock',
  'app.welcome.link.fetch-blocks': 'fetch',
  'app.welcome.link.block-list': 'blocklist',
  ...pages,
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...pwa,
  ...component,
  ...account,
  ...dashboard,
};
