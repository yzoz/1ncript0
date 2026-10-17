<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopBar from './components/TopBar.vue'
import SideDots from './components/SideDots.vue'
import DevModal from './components/DevModal.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <TopBar />
  <SideDots />
  <main id="top">
    <RouterView />
  </main>
  <SiteFooter />
  <DevModal />
</template>
