import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const active = ref('hero')

export function useActiveSection () {
  const route = useRoute()
  let observer: IntersectionObserver | null = null

  function setup () {
    observer?.disconnect()
    observer = null
    const sections = document.querySelectorAll('main section[id]')
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          active.value = entry.target.id
        }
      })
    }, { rootMargin: '-30% 0px -60% 0%' })
    sections.forEach((section) => observer?.observe(section))
  }

  onMounted(() => {
    setup()
    watch(() => route.fullPath, () => {
      window.setTimeout(setup, 320)
    })
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
  })

  return active
}
