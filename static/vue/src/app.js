import Vue from 'vue'
import App from './App.vue'
import ECharts from 'vue-echarts'

Vue.component('chart', ECharts)

const EventBus = new Vue()

const chart_base = {
    chart: {
        type: '',
        renderTo: ''
    },
    credits: {
        enabled: false
    },
    title: {
        text: ''
    },
    xAxis: {
        allowDecimals: false,
        categories: [],
        title: {
            text: ''
        }
    },
    yAxis: {
        title: {
            text: ''
        },
        opposite: true,
    },
    plotOptions: {},
    series: [{
        name: '',
        data: []
    }],
    credits: false
}

let GETDATA
let BASE

if (process.env.NODE_ENV === 'production') {
  GETDATA = '/' + location.pathname.split('/')[1] + '/default/get_data'
  BASE = '/' + location.pathname.split('/')[1] + '/default/index'
} else {
  GETDATA = '/default/get_data'
  BASE = '/'
}

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render: h => h(App)
})

export { EventBus, GETDATA, BASE, chart_base }
