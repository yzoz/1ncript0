<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useActiveSection } from '../composables/useActiveSection'
import { services } from '../data/services'

const scrolled = ref(false)
const progress = ref(0)
const menuOpen = ref(false)
const dropOpen = ref(false)
const active = useActiveSection()
const route = useRoute()

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

function closeDrop () {
  dropOpen.value = false
}

function toggleMenu () {
  menuOpen.value = !menuOpen.value
  if (!menuOpen.value) {
    closeDrop()
  }
}

function closeMenu () {
  menuOpen.value = false
  closeDrop()
}

function toggleDrop () {
  dropOpen.value = !dropOpen.value
}

watch(() => route.fullPath, () => {
  closeMenu()
})

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
      <RouterLink class="brand" to="/#top" aria-label="Евгений Носов — в начало" @click="closeMenu">1.0 <span>/ portfolio</span></RouterLink>
      <button class="menu-toggle" type="button" :aria-expanded="menuOpen" aria-controls="navlinks" @click="toggleMenu">{{ menuOpen ? 'Закрыть ×' : 'Меню +' }}</button>
      <nav id="navlinks" class="navlinks" :class="{ open: menuOpen }" aria-label="Основная навигация">
        <RouterLink v-for="link in links" :key="link.href" :to="'/' + link.href" :class="{ active: '#' + active === link.href }" @click="closeMenu">{{ link.label }}</RouterLink>
        <div class="nav-drop" @keydown.esc="closeDrop">
          <a
            class="nav-drop-toggle"
            :class="{ active: active === 'services' || route.name === 'service' }"
            href="/#services"
            :aria-expanded="dropOpen"
            aria-controls="services-menu"
            @click.prevent="toggleDrop"
          >
            Услуги
            <span class="nav-drop-arrow" aria-hidden="true">↓</span>
          </a>
          <ul id="services-menu" class="nav-drop-menu" :class="{ open: dropOpen }">
            <li v-for="item in services" :key="item.slug">
              <RouterLink :to="'/services/' + item.slug + '/'" @click="closeMenu">{{ item.title }}</RouterLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>
