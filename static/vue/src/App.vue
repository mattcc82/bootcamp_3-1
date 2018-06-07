<script>
import axios from 'axios'
import _ from 'lodash'
import chart from './components/chart'
import platforms from './components/platforms'
import { EventBus, GETDATA, GETPLATFORM, chartBase } from './app'

export default {
  name: 'app',
  components: {
    'chart': chart,
    'platforms': platforms
  },
  data: {
    run_time: '',
    selected: [],
    platforms: [],
    chart1_options: _.cloneDeep(chartBase),
    chart1_render_to: 'chart1',
    chart2_options: _.cloneDeep(chartBase),
    chart2_render_to: 'chart2',
    chart3_options: _.cloneDeep(chartBase),
    chart3_render_to: 'chart3'
  },
  created () {
    EventBus.$on('dataUpdate', (mySelected) => {
      this.selected = mySelected
      this.dataHandler()
    })
  },
  mounted: function () {
    // `this` points to the vm instance
    this.getPlatform()
    this.dataHandler()
  },
  methods: {
    getPlatform () {
      axios.get(GETPLATFORM)
        .then(response => {
          this.$data.platforms = response.data
          this.$data.selected = response.data
        })
    },
    dataHandler () {
      axios.get(GETDATA, {params: {selected: this.selected}})
        .then(response => {
          var data = response.data

          this.$data.chart1_options.chart.type = 'column'
          this.$data.chart1_options.series[0].data = data.chart1_data.series.map((x) => { return parseFloat(x) })
          this.$data.chart1_options.xAxis.categories = data.chart1_data.labels
          this.$data.chart1_options.title.text = 'User Score to Critic Score Disparity'
          this.$data.chart1_options.series[0].name = 'Game'

          this.$data.chart2_options.chart.type = 'column'
          this.$data.chart2_options.series[0].data = data.chart2_data.series.map((x) => { return parseFloat(x) })
          this.$data.chart2_options.xAxis.categories = data.chart2_data.labels
          this.$data.chart2_options.title.text = 'Sales by Developer'
          this.$data.chart2_options.series[0].name = 'Global Sales'

          this.$data.chart3_options.chart.type = 'line'
          this.$data.chart3_options.series = data.chart3_data.series
          this.$data.chart3_options.xAxis.categories = data.chart3_data.labels
          this.$data.chart3_options.title.text = 'Sales by Years'

          this.$data.run_time = data.run_time
        })
    }
  }
}
</script>
<style lang="scss">
@import '~bulma';
@import './assets/css/app.css';
</style>
