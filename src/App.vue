<template>
  <PageHeader />
  <RouterView />
</template>

<script setup lang="ts" name="HomeView">
import PageHeader from './components/PageHeader.vue';
</script>

<style>
#app {
  z-index: 0;
  width: 100vw;
  min-height: 100vh;
  padding: 0;
  margin: 0;
  overflow: hidden;
  text-align: left;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  font-size: var(--el-font-size-large);
}
</style>
