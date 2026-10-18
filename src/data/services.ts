export interface Service {
  slug: string
  title: string
  summary?: string
}

export const services: Service[] = [
  { slug: 'service-1', title: 'Услуга 1' },
  { slug: 'service-2', title: 'Услуга 2' }
]
