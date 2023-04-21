// demo
const demoRoutes = [
  {
    path: '/demo',
    name: 'IndexDemo',
    meta: {
      title: 'Demo',
    },
    component: () => import(/* webpackChunkName: "MyStatisticsView" */ '../../views/demo/DemoVue.vue'),
  },
];

export default demoRoutes;
