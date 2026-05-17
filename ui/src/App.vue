<script setup lang="ts">
import Header from './components/Header.vue';
import Toast from './components/Toast.vue';
</script>

<template>
  <Header />
  <main id="center">
    <router-view></router-view>
  </main>
  <Toast />
</template>

<style scoped>
#center {
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}
</style>
