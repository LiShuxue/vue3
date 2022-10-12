<script setup>
import { useRouter, useRoute } from 'vue-router';
import Other from './OtherView.vue';
import { useStore } from '../stores/counter';
/**
 * 路由
 */
const router = useRouter();
const route = useRoute();
// 动态路由主要通过两个函数实现。router.addRoute() 和 router.removeRoute()
const add = () => {
  router.addRoute({ path: '/other', name: 'other', component: Other });
};
// 路由跳转
const go = () => {
  router.push('other');
};
const remove = () => {
  router.removeRoute('other');
};
// 路由对象和路由参数
console.log('路由对象route：', route);
console.log('路由参数query：', route.query);

/**
 * 状态管理Pinia
 */
const store = useStore();
console.log('状态管理Pinia的store：', store);

const changeState = () => {
  store.counter++;
  // 或者一次修改多个
  store.$patch({
    counter: store.counter + 1,
    name: 'Abalam',
  });
};

const testAction = () => {
  store.increment();
};
</script>

<template>
  <div class="home">
    <div>路由和状态管理相关页面</div>
    <br />
    <div>路由</div>
    <button @click="add">动态添加新的路由other</button><br />
    <button @click="go">跳转到新增加的路由</button><br />
    <button @click="remove">删除动态增加路由</button><br />
    <br />
    <br />
    <div>Pinia状态</div>
    <div>store中的state：{{ store.counter }} {{ store.name }}</div>
    <button @click="changeState">修改store中的state</button><br />
    <button>store中的getter：{{ store.doubleCount }}</button><br />
    <button @click="testAction">触发store中的action</button><br />
  </div>
</template>

<style lang="scss" scoped></style>
