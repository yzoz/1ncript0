import { ref } from 'vue'

export const devModalProject = ref<string | null>(null)
export const devModalTrigger = ref<HTMLElement | null>(null)

export function openDevModal (project: string, trigger: HTMLElement) {
  devModalProject.value = project
  devModalTrigger.value = trigger
}

export function closeDevModal () {
  devModalProject.value = null
  devModalTrigger.value = null
}
