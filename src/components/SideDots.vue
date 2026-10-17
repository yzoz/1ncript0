<script setup lang="ts">
import { useActiveSection } from '../composables/useActiveSection'

const active = useActiveSection()

const dots = [
  { section: 'hero', label: 'Начало' },
  { section: 'projects', label: 'Проекты' },
  { section: 'competencies', label: 'Компетенции' },
  { section: 'experience', label: 'Опыт' },
  { section: 'services', label: 'Услуги' },
  { section: 'contacts', label: 'Контакты' }
]
</script>

<template>
  <nav class="side-dots" aria-label="Быстрая навигация">
    <a v-for="dot in dots" :key="dot.section" :href="'#' + dot.section" :class="{ active: active === dot.section }" :aria-label="dot.label"></a>
  </nav>
</template>
