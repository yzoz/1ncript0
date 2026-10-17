<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { openDevModal } from '../devModal'

const detailsOpen = ref(false)

function openDev (project: string, event: Event) {
  openDevModal(project, event.currentTarget as HTMLElement)
}

function toggleDetails () {
  detailsOpen.value = !detailsOpen.value
  if (!detailsOpen.value) {
    return
  }
  nextTick(() => {
    const details = document.getElementById('details-yat')
    if (!details) {
      return
    }
    const inner = details.querySelector('.details-grid')
    const rect = details.getBoundingClientRect()
    const fullH = inner ? inner.scrollHeight : details.scrollHeight
    if (rect.top + fullH > window.innerHeight - 24) {
      window.scrollTo(0, Math.max(rect.top + window.scrollY + fullH - window.innerHeight + 56, 0))
    }
  })
}
</script>

<template>
  <section id="projects" class="section">
    <div class="wrap">
      <div class="section-head"><div><p class="eyebrow mono">01 / Избранное</p><h2>Проекты<span class="muted">.</span></h2></div><p>Не витрина технологий, а следы инженерной работы: системы, эксперименты и инструменты с разными задачами и степенью готовности.</p></div>
      <article class="projects-feature">
        <div>
          <div class="project-index mono">01 — Флагманский проект</div>
          <h3 class="project-title">Yat <small>yatledger</small></h3>
          <p class="project-lead">Экспериментальная распределённая финансовая система на основе DAG — открытый реестр ценностей, прав и обязательств. Не криптовалюта и не платёжная система, а модель учёта и обмена обязательствами.</p>
        </div>
        <div class="project-side">
          <div class="tagrow"><span class="tag">DAG</span><span class="tag">Rust</span><span class="tag">Python</span><span class="tag">Vue</span><span class="tag">DevOps</span><span class="tag">Ed25519</span></div>
          <div class="project-actions"><a class="text-link" href="https://github.com/yatledger" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a><span class="text-link disabled" role="button" tabindex="0" @click="openDev('Yat / yatledger', $event)" @keydown.enter.prevent="openDev('Yat / yatledger', $event)" @keydown.space.prevent="openDev('Yat / yatledger', $event)">Сайт <span aria-hidden="true">↗</span></span></div>
          <div><span class="status">Эксперимент · есть работающие компоненты</span></div>
        </div>
        <div id="details-yat" class="project-details" :class="{ open: detailsOpen }">
          <div class="details-inner">
            <div class="details-grid">
              <div class="detail"><h4>Задача</h4><p>Исследовать модель реестра, в которой транзакции образуют граф, а операции связаны с подтверждением предыдущих действий.</p></div>
              <div class="detail"><h4>Мой вклад</h4><p>Проектирование архитектуры и реализация основных компонентов: клиентская часть, API и отдельные компоненты ядра.</p></div>
              <div class="detail"><h4>Инженерный фокус</h4><p>PWA-кошелёк с генерацией ключей в браузере, подписью транзакций и шифрованием; Python API / GraphQL и Rust-компоненты. Степень готовности отдельных механизмов различается.</p></div>
            </div>
          </div>
        </div>
        <button class="project-toggle" type="button" :aria-expanded="detailsOpen" aria-controls="details-yat" @click="toggleDetails"><span class="toggle-mark" aria-hidden="true">+</span><span class="toggle-label">{{ detailsOpen ? 'Свернуть подробности' : 'Читать подробности' }}</span></button>
      </article>

      <div class="featured-grid">
        <article class="project-card">
          <div class="card-top"><span class="card-number mono">02 / Web</span><span class="status">Долгосрочный проект</span></div>
          <h3 class="card-title">GreenWord <small>оптимистичный журнал о мире</small></h3>
          <p class="card-desc">Пример долгого жизненного цикла веб-продукта: разработка, собственные расширения CMS, инфраструктура, SEO, монетизация и сопровождение.</p>
          <div class="card-bottom"><div class="tagrow"><span class="tag">Web</span><span class="tag">CMS</span><span class="tag">SEO</span></div><div class="card-links"><a class="text-link" href="https://greenword.ru/" target="_blank" rel="noreferrer">Открыть сайт ↗</a></div></div>
        </article>
        <article class="project-card">
          <div class="card-top"><span class="card-number mono">03 / Privacy</span><span class="status">Концепция / разработка</span></div>
          <h3 class="card-title">Incripto <small>crypto tunnel</small></h3>
          <p class="card-desc">Концепция приватного взаимодействия. Проект исследует, как уменьшить зависимость от привычной регистрации, аккаунтов и централизованных идентификационных сервисов.</p>
          <div class="card-bottom"><div class="tagrow"><span class="tag">WS</span><span class="tag">EC</span><span class="tag">IM</span></div><div class="card-links"><a class="text-link" href="https://github.com/incripto" target="_blank" rel="noreferrer">GitHub ↗</a><span class="text-link disabled" role="button" tabindex="0" @click="openDev('Incripto', $event)" @keydown.enter.prevent="openDev('Incripto', $event)" @keydown.space.prevent="openDev('Incripto', $event)">Сайт ↗</span></div></div>
        </article>
        <article class="project-card">
          <div class="card-top"><span class="card-number mono">04 / Fintech</span><span class="status">Прототип</span></div>
          <h3 class="card-title">Narasimha <small>crypto financial</small></h3>
          <p class="card-desc">Платформа real-time аналитики крипторынка: поток данных, обработка, визуализация и Telegram-бот с торговыми сигналами. Полный цикл от backend до интерфейса и инфраструктуры.</p>
          <div class="card-bottom"><div class="tagrow"><span class="tag">FastAPI</span><span class="tag">InfluxDB</span><span class="tag">Quasar</span></div><div class="card-links"><span class="text-link disabled" role="button" tabindex="0" @click="openDev('Narasimha Crypto Financial', $event)" @keydown.enter.prevent="openDev('Narasimha Crypto Financial', $event)" @keydown.space.prevent="openDev('Narasimha Crypto Financial', $event)">Сайт ↗</span><span class="text-link disabled" role="button" tabindex="0" @click="openDev('Narasimha Crypto Financial', $event)" @keydown.enter.prevent="openDev('Narasimha Crypto Financial', $event)" @keydown.space.prevent="openDev('Narasimha Crypto Financial', $event)">GitHub ↗</span></div></div>
        </article>
        <article class="project-card">
          <div class="card-top"><span class="card-number mono">05 / ML</span><span class="status">Исследование</span></div>
          <h3 class="card-title">Volatility AI<small>market volatility nn</small></h3>
          <p class="card-desc">Эксперименты с моделями временных рядов: RNN-регрессия будущего значения и CNN-классификация направления движения. Без заявлений о точности или торговой эффективности.</p>
          <div class="card-bottom"><div class="tagrow"><span class="tag">RNN</span><span class="tag">CNN</span><span class="tag">TensorFlow</span></div><div class="card-links"><a class="text-link" href="https://github.com/yzoz/market-volatility-nn" target="_blank" rel="noreferrer">GitHub ↗</a><span class="text-link disabled" role="button" tabindex="0" @click="openDev('Market / market-volatility-nn', $event)" @keydown.enter.prevent="openDev('Market / market-volatility-nn', $event)" @keydown.space.prevent="openDev('Market / market-volatility-nn', $event)">Сайт ↗</span></div></div>
        </article>
      </div>

      <div class="compact-list">
        <div class="compact-heading"><h3>Другие разработки</h3><p class="mono">Инструменты · концепты · эксперименты</p></div>
        <article class="project-card compact">
          <div class="card-top"><span class="card-number mono">06</span><span class="status">Концепт / эксперимент</span></div><h3 class="card-title">Entropy money</h3><p class="card-desc">Консольная утилита на Go для взаимозачётов и mutual credit на подписанных IOU-контрактах. Балансы вычисляются из набора контрактов; блокчейн и центральный сервер не обязательны.</p><div class="card-bottom"><div class="card-links"><a class="text-link" href="https://github.com/yzoz/entropy" target="_blank" rel="noreferrer">GitHub ↗</a></div></div>
        </article>
        <article class="project-card compact">
          <div class="card-top"><span class="card-number mono">07</span><span class="status">Python · pip</span></div><h3 class="card-title">Option calculator</h3><p class="card-desc">Самодостаточная реализация Black–Scholes–Merton на чистом Python: теоретическая цена, Greeks, P&amp;L портфеля, визуализация и delta-neutral расчёты.</p><div class="card-bottom"><div class="card-links"><a class="text-link" href="https://github.com/yzoz/python-option-calculator" target="_blank" rel="noreferrer">GitHub ✪ 150 ↗</a><a class="text-link" href="https://pypi.org/project/option-calculator/" target="_blank" rel="noreferrer">PyPI ↗</a></div></div>
        </article>
        <article class="project-card compact">
          <div class="card-top"><span class="card-number mono">08</span><span class="status">Обучающий проект</span></div><h3 class="card-title">Asymmetric cryptography</h3><p class="card-desc">Читаемая RSA-подобная реализация на чистом Python с разбором математики, блочным кодированием текста и демонстрацией факторизации. Не предназначена для защиты реальных данных.</p><div class="card-bottom"><div class="card-links"><a class="text-link" href="https://github.com/yzoz/python-asymmetric-cryptography" target="_blank" rel="noreferrer">GitHub ↗</a></div></div>
        </article>
        <article class="project-card compact">
          <div class="card-top"><span class="card-number mono">09</span><span class="status">Концепт</span></div><h3 class="card-title">Option exchange</h3><p class="card-desc">Экспериментальный проект биржи опционов. Здесь намеренно не перечислены функции, готовность и результаты, которые ещё требуют проверки.</p><div class="card-bottom"><div class="card-links"><a class="text-link" href="https://github.com/yzoz/option-exchange" target="_blank" rel="noreferrer">GitHub ↗</a><span class="text-link disabled" role="button" tabindex="0" @click="openDev('Option Exchange', $event)" @keydown.enter.prevent="openDev('Option Exchange', $event)" @keydown.space.prevent="openDev('Option Exchange', $event)">Сайт ↗</span></div></div>
        </article>
        <article class="project-card compact">
          <div class="card-top"><span class="card-number mono">10</span><span class="status">Legacy · ранний эксперимент</span></div><h3 class="card-title">RNN market prediction</h3><p class="card-desc">Ранняя попытка краткосрочного прогнозирования рыночных цен с помощью RNN и TensorFlow. Отдельный legacy-проект, предшествующий Market.</p><div class="card-bottom"><div class="card-links"><a class="text-link" href="https://github.com/yzoz/rnn-market-prediction" target="_blank" rel="noreferrer">GitHub ↗</a></div></div>
        </article>
        <article class="project-card compact">
          <div class="card-top"><span class="card-number mono">&nbsp;</span><span class="status">&nbsp;</span></div><h3 class="card-title">&nbsp;</h3><p class="card-desc">&nbsp;</p><div class="card-bottom"><div class="card-links">&nbsp;</div></div>
        </article>
      </div>
    </div>
  </section>
</template>
