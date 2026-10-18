import type { Service } from './services'

export interface PageMeta {
  title: string
  description: string
  ogTitle: string
  ogDescription: string
}

const author = 'Евгений Носов'

const siteDescription = 'Евгений Носов — архитектор-практик и full-stack-разработчик. Проектирование архитектуры, Python, Rust, распределённые системы, AI, fintech и криптография.'

const siteOgDescription = 'Архитектор-практик, который сам пишет код. Разработка, распределённые системы, финансовые технологии и машинное обучение.'

export const homeMeta: PageMeta = {
  title: `${author} — от идеи до работающей системы`,
  description: siteDescription,
  ogTitle: `${author} — От идеи до работающей системы`,
  ogDescription: siteOgDescription
}

export function serviceMeta (service: Service): PageMeta {
  const title = `${service.title} — ${author}`
  return {
    title,
    description: service.summary ?? siteDescription,
    ogTitle: title,
    ogDescription: service.summary ?? siteOgDescription
  }
}
