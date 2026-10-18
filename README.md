# 1ncript0

Личный сайт-портфолио Евгения Носова. SPA на Vue 3 + TypeScript, собирается Vite.

## Стек

Vue 3 (`<script setup lang="ts">`) · TypeScript strict · Vue Router (history mode) · Vite · plain CSS. Runtime-зависимости — только `vue` и `vue-router`.

## Карта репозитория

```
index.html            точка входа Vite: meta/og, шрифты, favicon
public/               статика как есть: favicon.ico, img/ (иконки)
src/
  main.ts             клиент: гидрация предрендера или клиентский рендер
  app.ts              createPortfolioApp: приложение + роутер (клиент и сервер)
  entry-server.ts     render(url) для предрендера: html + meta
  App.vue             layout: TopBar, SideDots, RouterView, SiteFooter, DevModal
  router/index.ts     маршруты + scrollBehavior для якорей
  data/
    services.ts       услуги: slug, title, summary
    meta.ts           title/og по страницам
  views/
    HomeView.vue      главная: все секции страницы
    ServiceView.vue   внутренняя страница услуги
  components/
    TopBar.vue        sticky-шапка, прогресс-бар, мобильное меню
    SideDots.vue      боковые точки навигации
    HeroSection.vue
    ProjectsSection.vue   проекты: флагман с аккордеоном, карточки, disabled-ссылки
    CompetenciesSection.vue
    ExperienceSection.vue
    ContactSection.vue
    SiteFooter.vue
    DevModal.vue      модалка «in development» (Teleport, Esc, возврат фокуса)
  composables/
    useActiveSection.ts   активная секция через IntersectionObserver
  devModal.ts         открытие/закрытие модалки (shared ref)
  styles/main.css     все стили сайта
scripts/
  prerender.mjs       предрендер HTML на этапе сборки
deploy/
  nginx.conf.example  конфиг nginx для раздачи dist/ с SPA-fallback
.txt/                 рабочие материалы (в сборку не входит)
```

## Сборка и запуск

```bash
npm ci          # установка зависимостей
npm run dev     # дев-сервер: http://localhost:5173
npm run build   # типы (vue-tsc) + прод-сборка + предрендер HTML в dist/
npm run preview # локальный просмотр dist/
```

## Предрендер

`npm run build` после сборки запускает `scripts/prerender.mjs`: рендерит приложение через
`vue/server-renderer` и вкладывает готовый HTML в `dist/index.html` и
`dist/services/<slug>/index.html`. Новых зависимостей нет — используется
`vue/server-renderer`, уже входящий в состав `vue`.

Разметку видно без JavaScript (краулеры, соцсети, `noscript`-браузеры), а при наличии JS
страница гидратируется тем же кодом. `<title>`, `meta name="description"` и `og:*`
подставляются по страницам из `src/data/meta.ts`: главная — `homeMeta`, страница услуги —
`serviceMeta(service)` (текст описания берётся из `Service.summary`, пока не задан —
общий для сайта).

Список страниц для предрендера собирается из `src/data/services.ts`: `/` плюс
`/services/<slug>` для каждой услуги.

## Как добавить страницу

1. Создать view: `src/views/SomeView.vue` (root — один `<section>` или `<div>`).
2. Зарегистрировать маршрут в `src/router/index.ts`: `{ path: '/some', name: 'some', component: SomeView }`.
3. Добавить ссылку в навигацию (`TopBar.vue`).
4. Если страница нужна в статике — добавить её URL в список `pages` в `scripts/prerender.mjs`.

Без шага 4 страница работает как обычная SPA: nginx отдаёт любой путь через
`try_files $uri $uri/ /index.html`, роутинг подхватывает его на клиенте.

## Деплой

`npm run build` → содержимое `dist/` заливается на сервер (rsync/scp). nginx раздаёт статику по примеру `deploy/nginx.conf.example`: SPA-fallback на `index.html`, gzip, долгий кэш для `/assets/`.
