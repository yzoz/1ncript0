import { onMounted, onUnmounted, ref } from 'vue'

const active = ref('hero')
let observer: IntersectionObserver | null = null

export function useActiveSection () {
  onMounted(() => {
    const sections = document.querySelectorAll('main section[id]')
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          active.value = entry.target.id
        }
      })
    }, { rootMargin: '-30% 0px -60% 0%' })
    sections.forEach((section) => observer?.observe(section))
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
  })

  return active
}
