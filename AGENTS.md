# AGENTS.md

Сайт-портфолио: Vue 3 SPA + TypeScript + Vite + Vue Router. Контент на русском.

## Соглашения

- Всё на `<script setup lang="ts">`, strict TypeScript, без any без нужды.
- Стиль Standard: без точек с запятой, одинарные кавычки, отступ 2 пробела, пробел перед `()` в объявлениях функций.
- Зависимости: только `vue` и `vue-router`. Ничего добавлять без явного согласования (линтеры, CSS-фреймворки, state-менеджеры — запрещены).
- Тесты и комментарии в коде не пишем.
- Стили — plain CSS в `src/styles/main.css`, классы из существующих. Не вводить scoped-стили, SCSS, CSS-модули.
- Страницы = роуты в `src/router/index.ts`, view в `src/views/`. Якоря `#section` на главной работают через `scrollBehavior`.
- Внешние ссылки — всегда `target="_blank" rel="noreferrer"`.
- Деплой: `npm run build` → `dist/` → nginx со SPA-fallback (`try_files $uri $uri/ /index.html`), см. `deploy/nginx.conf.example`.
- Пакетный менеджер: npm. `.txt/` — рабочие материалы, в сборку не входят.
