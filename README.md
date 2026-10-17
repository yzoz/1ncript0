# 1ncript0

Личный сайт-портфолио Евгения Носова. SPA на Vue 3 + TypeScript, собирается Vite.

## Стек

Vue 3 (`<script setup lang="ts">`) · TypeScript strict · Vue Router (history mode) · Vite · plain CSS. Runtime-зависимости — только `vue` и `vue-router`.

## Карта репозитория

```
index.html            точка входа Vite: meta/og, шрифты, favicon
public/               статика как есть: favicon.ico, img/ (иконки)
src/
  main.ts             createApp + router
  App.vue             layout: TopBar, SideDots, RouterView, SiteFooter, DevModal
  router/index.ts     маршруты + scrollBehavior для якорей
  views/
    HomeView.vue      главная: все секции страницы
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
deploy/
  nginx.conf.example  конфиг nginx для раздачи dist/ с SPA-fallback
.txt/                 рабочие материалы (в сборку не входит)
```

## Сборка и запуск

```bash
npm ci          # установка зависимостей
npm run dev     # дев-сервер: http://localhost:5173
npm run build   # типы (vue-tsc) + прод-сборка в dist/
npm run preview # локальный просмотр dist/
```

## Как добавить страницу

1. Создать view: `src/views/SomeView.vue` (root — один `<section>` или `<div>`).
2. Зарегистрировать маршрут в `src/router/index.ts`: `{ path: '/some', name: 'some', component: SomeView }`.
3. Добавить ссылку в навигацию (`TopBar.vue`).

Всё. nginx отдаёт любые пути через `try_files ... /index.html`, роутинг работает напрямую.

## Деплой

`npm run build` → содержимое `dist/` заливается на сервер (rsync/scp). nginx раздаёт статику по примеру `deploy/nginx.conf.example`: SPA-fallback на `index.html`, gzip, долгий кэш для `/assets/`.
