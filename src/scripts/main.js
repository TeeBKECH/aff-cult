import { topicIconColor } from '@/scripts/components/topic.js'
import { initSwipers } from '@/scripts/components/swiper.js'
import { accordionsInit } from '@/scripts/components/accordion.js'
import { filtersHandler } from '@/scripts/components/filters.js'
import { calendarInit } from '@/scripts/components/calendar.js'
import { initModalSystem, registerModal, toggleModal } from '@/scripts/components/modal.js'

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
  // Filters
  filtersHandler()
  // Calendar
  calendarInit()
  // Modal
  initModalSystem()
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

  // Пример использования
  truncateAccordionText('.table_subTitle', 140, {
    showText: 'Показать все...',
    hideText: 'Скрыть',
    btnClass: 'influencer_card_description_more',
  })

  // Регистрируем модалки
  const burger = document.querySelector('.burger')
  registerModal('mobile-menu', {
    closeOnBackdrop: true,
    closeOnEscape: true,
    exclusive: true,
    onOpen: (modal) => burger.classList.add('active'),
    onClose: (modal) => burger.classList.remove('active'),
  })
  registerModal('mobile-topic', {
    closeOnBackdrop: true,
    closeOnEscape: true,
    exclusive: true,
    onOpen: (modal) => console.log('Меню открыто'),
    onClose: (modal) => console.log('Меню закрыто'),
  })
  registerModal('search-results', {
    closeOnBackdrop: false, // Не закрывать при клике на бэкдроп
    closeOnEscape: true,
    exclusive: false,
    onOpen: (modal) => {
      const input = modal.querySelector('input')
      if (input) input.focus()
    },
  })
})
