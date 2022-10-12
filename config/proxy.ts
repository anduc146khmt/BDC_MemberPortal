/**
 * https://pro.ant.design/docs/deploy
 *
 * @doc https://umijs.org/docs/guides/proxy
 */

export default {
  '/api/v1': {
    target: 'http://hpcc.hcmut.edu.vn:10041',
    changeOrigin: true,
    // pathRewrite: { '^': '' },
  },
};
