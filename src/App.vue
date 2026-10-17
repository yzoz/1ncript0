<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import TopBar from './components/TopBar.vue'
import SideDots from './components/SideDots.vue'
import DevModal from './components/DevModal.vue'
import SiteFooter from './components/SiteFooter.vue'

const route = useRoute()
const isHome = computed(() => route.name === 'home')
</script>

<template>
  <TopBar />
  <SideDots v-if="isHome" />
  <main id="top">
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </main>
  <SiteFooter />
  <DevModal />
</template>
