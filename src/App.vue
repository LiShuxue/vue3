<script setup>
import HelloWorld from '@/components/HelloWorld.vue';
</script>

<template>
  <HelloWorld msg="hello world" />

  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
  </nav>

  <router-view />
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
