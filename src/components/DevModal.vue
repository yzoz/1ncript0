<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { closeDevModal, devModalProject, devModalTrigger } from '../devModal'

const closeButton = ref<HTMLElement | null>(null)
const ready = ref(false)
let lastTrigger: HTMLElement | null = null

function onKeydown (event: KeyboardEvent) {
  if (event.key === 'Escape' && devModalProject.value) {
    closeDevModal()
  }
}

watch(devModalProject, async (project) => {
  if (project) {
    lastTrigger = devModalTrigger.value
    document.body.style.overflow = 'hidden'
    await nextTick()
    closeButton.value?.focus()
  } else {
    document.body.style.overflow = ''
    lastTrigger?.focus()
    lastTrigger = null
  }
})

onMounted(() => {
  ready.value = true
  window.addEventListener('keydown', onKeydown)
})
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport v-if="ready" to="body">
    <div v-if="devModalProject" class="modal-backdrop" role="presentation" @click.self="closeDevModal">
      <section class="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle" aria-describedby="modalContext">
        <div class="modal-top">
          <h2 id="modalTitle">{{ devModalProject }}</h2>
          <button ref="closeButton" class="modal-close" type="button" aria-label="Закрыть окно" @click="closeDevModal">×</button>
        </div>
        <p>in development</p>
        <div id="modalContext" class="modal-context">Ресурс проекта «{{ devModalProject }}» пока не опубликован.</div>
      </section>
    </div>
  </Teleport>
</template>
