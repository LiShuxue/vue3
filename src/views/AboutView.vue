<script setup>
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
  onActivated,
  onDeactivated,
} from 'vue';

onBeforeMount(() => {
  console.log('onBeforeMount');
});
onMounted(() => {
  console.log('onMounted');
});
onBeforeUpdate(() => {
  console.log('onBeforeUpdate');
});
onUpdated(() => {
  console.log('onUpdated');
});
onBeforeUnmount(() => {
  console.log('onBeforeUnmount');
});
onUnmounted(() => {
  console.log('onUnmounted');
});
onErrorCaptured(() => {
  console.log('onErrorCaptured');
});
onActivated(() => {
  console.log('onActivated');
});
onDeactivated(() => {
  console.log('onDeactivated');
});

const change = () => {
  a.value++; // 触发update
};
const a = ref(0);
</script>
<template>
  <div class="about">
    <div>生命周期页面</div>
    <div>{{ a }}</div>
    <button @click="change">触发update</button>
  </div>
</template>

<style lang="scss" scoped></style>
