import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

// 创建app，可创建多个
const app = createApp(App);

// 创建一个 pinia（根存储）并将其传递给应用程序。
const pinia = createPinia();
app.use(pinia);

// 注入路由
app.use(router);

// 全局的错误处理
app.config.errorHandler = (err) => {
  console.log('全局错误：', err);
};

// 可被全局访问，相当于vue2的Vue.prototype
app.config.globalProperties.global = 'global data';

app.mount('#app');
