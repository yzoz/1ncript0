import { createMemoryHistory } from 'vue-router'
import { renderToString } from 'vue/server-renderer'
import { createPortfolioApp } from './app'
import { homeMeta, serviceMeta, type PageMeta } from './data/meta'
import { services } from './data/services'

export interface RenderResult {
  html: string
  meta: PageMeta
}

export async function render (url: string): Promise<RenderResult> {
  const { app, router } = createPortfolioApp(createMemoryHistory(), true)
  await router.push(url)
  await router.isReady()
  const html = await renderToString(app)
  const slug = router.currentRoute.value.params.slug
  const service = typeof slug === 'string'
    ? services.find((item) => item.slug === slug)
    : undefined
  return {
    html,
    meta: service ? serviceMeta(service) : homeMeta
  }
}
