/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.UserInfo } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canView: currentUser && currentUser.role !== 'guest',
  };
}
