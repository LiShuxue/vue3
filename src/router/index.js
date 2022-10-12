import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

// new Router 变成 createRouter
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 或者 createWebHashHistory()
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      beforeEnter: (to, from) => {
        console.log('路由独享守卫触发：', `从${from.path} --> ${to.path}`);
        return true; // false 会禁止进入路由
      },
    },
  ],
});

// 全局守卫
router.beforeEach((to, from) => {
  console.log('全局路由守卫触发：', `从${from.path} --> ${to.path}`);
});

export default router;
