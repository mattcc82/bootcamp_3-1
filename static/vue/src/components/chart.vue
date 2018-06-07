<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        <div :id="render_to"></div>
      </div>
    </div>
  </div>
</template>

<script>
const Highcharts = require('highcharts')

export default {
  name: 'chart',
  props: ['options', 'render_to'],
  data () {
    return { highChart: undefined }
  },
  methods: {
    redraw () {
      const theLen = this.highChart.series.length
      for (var i = 0; i < theLen; i++) {
        this.highChart.series[0].remove()
      }
      for (const v of this.options.series) {
        this.highChart.addSeries(v, true)
        // this.highChart.series[i].setData(v, true)
      }
      // this.highChart.update(this.options, false)
      // this.highChart.redraw()
    }
  },
  watch: {
    options: {
      handler (a) {
        this.redraw()
      },
      deep: true
    }
  },
  mounted () {
    this.options.chart.renderTo = this.render_to
    this.highChart = new Highcharts.Chart(this.options)
  }
}
</script>
