<script setup lang="ts">
import { services } from '../data/services'
</script>

<template>
  <section id="services" class="section">
    <div class="wrap">
      <div class="section-head">
        <h2>Услуги</h2>
      </div>
      <div class="services-grid">
        <RouterLink
          v-for="(item, i) in services"
          :key="item.slug"
          class="service-card"
          :to="'/services/' + item.slug"
        >
          <span class="mono services-index">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="service-card-title">{{ item.title }}</span>
          <span class="arrow" aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
