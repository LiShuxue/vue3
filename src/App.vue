<script setup>
import { ref, watch } from 'vue';
// 组件引入后可直接使用
import HelloWorld from '@/components/HelloWorld.vue';

// 父组件监听函数
const testEvent = (e) => {
  console.log('父组件中信息：parent event-triggerd');
  console.log('event对象：', e);
};

const init = ref(0);

watch(init, (val) => {
  console.log('父组件中v-modal变化：', val);
});
</script>

<template>
  <div>组件与核心知识：</div>
  <hr />
  <HelloWorld v-model="init" msg="hello world" @my-event="testEvent" />

  <router-link to="/about" style="display: block; margin-top: 50px">
    生命周期
  </router-link>
  <router-link to="/"> 路由vue-router和状态管理Pinia </router-link>
  <hr />

  <!-- transition 和 keep-alive 现在必须通过 v-slot API 在 RouterView 内部使用 -->
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style lang="scss" scoped>
@import '@/assets/base.scss';

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}
</style>
