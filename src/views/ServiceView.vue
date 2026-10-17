<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { services } from '../data/services'

const route = useRoute()
const service = computed(() => services.find((item) => item.slug === route.params.slug))
</script>

<template>
  <div class="service-page">
    <div class="wrap">
      <nav class="breadcrumbs mono" aria-label="Хлебные крошки">
        <RouterLink to="/#top">Главная</RouterLink>
        <span aria-hidden="true">/</span>
        <RouterLink to="/#services">Услуги</RouterLink>
        <span aria-hidden="true">/</span>
        <span class="breadcrumbs-current">{{ service?.title ?? 'Название услуги' }}</span>
      </nav>
      <header class="service-hero">
        <h1>{{ service?.title ?? 'Название услуги' }}</h1>
      </header>
    </div>
    <div class="service-space" aria-hidden="true"></div>
  </div>
</template>
