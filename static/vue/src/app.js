import Vue from 'vue'
import App from './App.vue'
import Highcharts from 'vue-highcharts'

Vue.component('chart', Highcharts)

const EventBus = new Vue()

const chartBase = {
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
    opposite: true
  },
  plotOptions: {},
  series: [{
    name: '',
    data: []
  }]
}

let GETDATA
let GETPLATFORM

if (process.env.NODE_ENV === 'production') {
  GETDATA = '/' + location.pathname.split('/')[1] + '/default/get_data'
  GETPLATFORM = '/' + location.pathname.split('/')[1] + '/default/get_platform'
} else {
  GETDATA = '/default/get_data'
  GETPLATFORM = '/default/get_platform'
}

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render: h => h(App)
})

export { EventBus, GETDATA, GETPLATFORM, chartBase }
