// 公共
const indexRoutes = [
  {
    path: '/404',
    name: 'NotFound',
    meta: {
      title: '页面不存在',
    },
    component: () => import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
  },
];

export default indexRoutes;
