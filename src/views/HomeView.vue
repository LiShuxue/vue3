<script setup>
import { useCounterStore } from '@/stores/counter';
const counter = useCounterStore();

counter.count++;
// 带自动补全 ✨
counter.$patch({ count: counter.count + 1 });
// 或使用 action 代替
counter.increment();
</script>

<template>
  <div class="home">
    <h1>This is home page</h1>
  </div>
</template>

<style lang="scss" scoped></style>
