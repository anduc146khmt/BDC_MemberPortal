/**
 * @name umi
 * @description path,component,routes,redirect,wrappers,title
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/user',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
        footerRender: false,
        menuRender: false,
        menuHeaderRender: false,
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'dashboard',
    component: './Dashboard',
  },
  {
    name: 'analysis',
    path: '/analysis',
    icon: 'BarChart',
    component: './List',
    access: 'canView',
  },
  {
    path: '/submit',
    name: 'submit',
    icon: 'form',
    component: './Submit',
    access: 'canView',
  },
  {
    path: '/account',
    name: 'account',
    icon: 'user',
    component: './Account',
    access: 'canView',
  },
  {
    path: '/settings',
    name: 'settings',
    icon: 'setting',
    component: './Settings',
    access: 'canView',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '*',
    component: './404',
  },
];
