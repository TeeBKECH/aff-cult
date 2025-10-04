import * as echarts from 'echarts'

const chartDom = document.getElementById('echarts_container-id')
const myChart = chartDom && echarts.init(chartDom)
let option

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
option = {
  legend: {
    data: ['Посты', 'Репосты'],
    right: '5%',
  },
  tooltip: {},
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

option && myChart && myChart.setOption(option)
