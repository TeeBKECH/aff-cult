import { topicIconColor } from '@/scripts/components/topic.js'
import { initSwipers } from '@/scripts/components/swiper.js'
import { accordionsInit } from '@/scripts/components/accordion.js'
import { filtersHandler } from '@/scripts/components/filters.js'
import { calendarInit } from '@/scripts/components/calendar.js'
import { initModalSystem, registerModal, toggleModal } from '@/scripts/components/modal.js'
import { initTableSorting } from '@/scripts/components/table.js'
import { createEchart, createEchartGradientStyle } from '@/scripts/components/echarts.js'

import '@/scripts/components/playVideo.js'
import '@/scripts/components/stars.js'
import '@/scripts/components/tag.js'

import { truncateAccordionText } from '@/scripts/utils/truncText.js'

import '@/styles/styles.scss'

// Пример CSS Modules
// import card from '@/styles/components/card.module.scss'
// const cardEl = document.createElement('div')
// cardEl.className = card.card
// cardEl.textContent = 'Пример SCSS Modules'
// document.body.appendChild(cardEl)

// Динамический импорт страничного кода
// ;(async () => {
//   const p = location.pathname.replace(/\/+$/, '')
//   if (p.endsWith('/tg-channels-full.html')) {
//     await import('@/scripts/pages/tg.js')
//   } else {
//     await import('@/scripts/pages/index.js')
//   }
// })()

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

  truncateAccordionText('.influencer_card_description', 70, {
    showText: 'Показать все...',
    hideText: 'Скрыть',
    btnClass: 'influencer_card_description_more',
  })

  truncateAccordionText('.table_subTitle', 140, {
    showText: 'Показать все...',
    hideText: 'Скрыть',
    btnClass: 'influencer_card_description_more',
  })

  truncateAccordionText('.post_alt_text', 190, {
    showText: 'Показать еще...',
    hideText: 'Скрыть',
    btnClass: 'post_alt_text_more',
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
  registerModal('banner-sizes', {
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

  // Создаем главный график
  let xAxisData = []
  let data1 = []
  let data2 = []
  for (let i = 1; i < 11; i++) {
    xAxisData.push('Авг' + i)
    data1.push(+(Math.random() * 15).toFixed(2))
    data2.push(+(Math.random() * 5).toFixed(2))
  }
  const emphasisStyle = {
    itemStyle: {
      shadowBlur: 2,
      shadowColor: 'rgba(0,0,0,1)',
    },
  }
  let options = {
    legend: {
      data: ['Посты', 'Репосты'],
      right: '5%',
    },
    xAxis: {
      data: xAxisData,
      name: '',
      axisLine: { onZero: true },
      splitLine: { show: false },
      splitArea: { show: false },
      axisLabel: {
        interval: 0,
        rotate: 0, // или 45 если не помещаются
        fontSize: 12,
        width: 60, // максимальная ширина подписи
        overflow: 'truncate', // обрезать если не помещается
      },
    },
    yAxis: {
      min: 0, // начать с 0
      scale: true, // автоматическое масштабирование
    },
    grid: {
      width: '100%', // ширина области графика
      height: '100%', // высота области графика
      left: '5px', // отступ слева
      bottom: '72px',
    },
    series: [
      {
        name: 'Посты',
        type: 'bar',
        stack: 'one',
        emphasis: emphasisStyle,
        data: data1,
        barWidth: 21,
        itemStyle: {
          color: '#FE6E00', // синий цвет
          borderRadius: [5, 5, 0, 0],
        },
      },
      {
        name: 'Репосты',
        type: 'bar',
        stack: 'one',
        emphasis: emphasisStyle,
        data: data2,
        itemStyle: {
          color: '#FDDAC0', // синий цвет
          borderRadius: [5, 5, 0, 0],
        },
      },
    ],
  }

  createEchart('echarts_container-id', options)

  // Создаем графики для подписчиков и просмотров постов
  let echartsDate = []
  let echartsData = [Math.random() * 300]
  for (let i = 1; i < 4; i++) {
    // Для последних 4 дней
    var now = new Date()
    now.setDate(now.getDate() - (4 - i)) // Получаем последние 4 дня
    echartsDate.push(now.toISOString().split('T')[0]) // Преобразуем в строку (YYYY-MM-DD)
    echartsData.push(Math.round((Math.random() - 0.5) * 20 + echartsData[i - 1]))
  }

  const echartsOptions = {
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      containLabel: false, // важно — чтобы подписи не резервировали место
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: echartsDate,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      splitLine: { show: false },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      splitLine: { show: false },
    },
    legend: { show: false },
    series: [
      {
        type: 'line',
        data: echartsData,
        symbol: 'none',
        itemStyle: {
          color: '#FE6E00', // цвет линии
        },
        areaStyle: {
          color: createEchartGradientStyle('#FDDAC0', '#FFFFFF'),
        },
        data: echartsData,
      },
    ],
  }

  // // Инициализация графика для первого графика (если контейнер уже существует)
  // const chartDom1 = document.getElementById('chart1')
  // const myChart1 = echarts.init(chartDom1)
  // myChart1.setOption(option)

  // // Для второго графика, аналогично
  // const chartDom2 = document.getElementById('chart2')
  // const myChart2 = echarts.init(chartDom2)
  // myChart2.setOption(option)

  createEchart('echarts_container_subs-id', echartsOptions)
  createEchart('echarts_container_views-id', echartsOptions)
})
