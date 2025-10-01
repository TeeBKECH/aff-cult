import { topicIconColor } from '@/scripts/components/topic.js'
import { initSwipers } from '@/scripts/components/swiper.js'
import { accordionsInit } from '@/scripts/components/accordion.js'

import { truncateAccordionText } from '@/scripts/utils/truncText.js'

import '@/styles/styles.scss'

// Пример CSS Modules
// import card from '@/styles/components/card.module.scss'
// const cardEl = document.createElement('div')
// cardEl.className = card.card
// cardEl.textContent = 'Пример SCSS Modules'
// document.body.appendChild(cardEl)

// Динамический импорт страничного кода
;(async () => {
  const p = location.pathname.replace(/\/+$/, '')
  if (p.endsWith('/about.html')) {
    await import('@/scripts/pages/about.js')
  } else {
    await import('@/scripts/pages/index.js')
  }
})()

const initScripts = () => {
  // Topic Scripts
  topicIconColor()
  // Swiper Scripts
  initSwipers()
  // Accordions Init
  accordionsInit()
}

document.addEventListener('DOMContentLoaded', (e) => {
  initScripts()

  // Пример использования
  truncateAccordionText('.ad_accordion_text', 150, {
    showText: 'Показать все...',
    hideText: 'Скрыть',
    btnClass: 'ad_accordion_text_show-more',
  })

  // Пример использования
  truncateAccordionText('.influencer_card_description', 70, {
    showText: 'Показать все...',
    hideText: 'Скрыть',
    btnClass: 'influencer_card_description_more',
  })
})
