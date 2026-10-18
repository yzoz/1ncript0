import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const homeFile = resolve(dist, 'index.html')
const marker = '<div id="app"></div>'

function escapeHtml (value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function applyPage (template, page) {
  const { html, meta } = page
  return template
    .replace(marker, () => `<div id="app">${html}</div>`)
    .replace(/<title>[\s\S]*?<\/title>/, () => `<title>${escapeHtml(meta.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, (_, head, tail) => head + escapeHtml(meta.description) + tail)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, (_, head, tail) => head + escapeHtml(meta.ogTitle) + tail)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, (_, head, tail) => head + escapeHtml(meta.ogDescription) + tail)
}

const vite = await createServer({
  root,
  appType: 'custom',
  logLevel: 'warn',
  server: { middlewareMode: true, watch: null }
})

try {
  const { render } = await vite.ssrLoadModule('/src/entry-server.ts')
  const { services } = await vite.ssrLoadModule('/src/data/services.ts')
  const template = readFileSync(homeFile, 'utf-8')

  if (!template.includes(marker)) {
    throw new Error('prerender: marker div not found in dist/index.html')
  }

  const pages = [
    { url: '/', file: homeFile },
    ...services.map((service) => ({
      url: `/services/${service.slug}/`,
      file: resolve(dist, 'services', service.slug, 'index.html')
    }))
  ]

  for (const page of pages) {
    const result = await render(page.url)
    mkdirSync(dirname(page.file), { recursive: true })
    writeFileSync(page.file, applyPage(template, result))
    console.log(`prerendered ${page.url} -> ${page.file}`)
  }
} finally {
  await vite.close()
}
