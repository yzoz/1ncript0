<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useActiveSection } from '../composables/useActiveSection'

const scrolled = ref(false)
const progress = ref(0)
const menuOpen = ref(false)
const active = useActiveSection()

const links = [
  { href: '#projects', label: 'Проекты' },
  { href: '#competencies', label: 'Компетенции' },
  { href: '#experience', label: 'Опыт' },
  { href: '#contacts', label: 'Контакты' }
]

function onScroll () {
  scrolled.value = window.scrollY > 12
  const doc = document.documentElement
  progress.value = (doc.scrollTop / Math.max(doc.scrollHeight - doc.clientHeight, 1)) * 100
}

function toggleMenu () {
  menuOpen.value = !menuOpen.value
}

function closeMenu () {
  menuOpen.value = false
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div class="progress-bar" :style="{ width: progress + '%' }" aria-hidden="true"></div>
  <header class="topbar" :class="{ scrolled }">
    <div class="wrap nav">
      <a class="brand" href="#top" aria-label="Евгений Носов — в начало">1.0 <span>/ portfolio</span></a>
      <button class="menu-toggle" type="button" :aria-expanded="menuOpen" aria-controls="navlinks" @click="toggleMenu">{{ menuOpen ? 'Закрыть ×' : 'Меню +' }}</button>
      <nav id="navlinks" class="navlinks" :class="{ open: menuOpen }" aria-label="Основная навигация">
        <a v-for="link in links" :key="link.href" :href="link.href" :class="{ active: '#' + active === link.href }" @click="closeMenu">{{ link.label }}</a>
      </nav>
    </div>
  </header>
</template>
