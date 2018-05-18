<template>
  <nav class="panel">
      <p class="panel-heading">
          Platform Filters
      </p>
      <div class="panel-block">
          <div class="select is-multiple">
              <select multiple size="18" v-model='mySelected' v-on:change="emitChange" class='multi-select'>
                  <option v-for="platform in platforms" v-bind:value="platform">
                      {% platform %}
                  </option>
              </select>
          </div>
      </div>
  </nav>
</template>

<script>
import { EventBus } from '../app'
export default {
  name: 'platforms',
  props: ['platforms', 'selected'],
	data(){
        return{mySelected: this.selected  }
    },
	methods:{
        emitChange() {
            EventBus.$emit('dataUpdate', this.mySelected)
        }
	},
	watch: {
	},
	mounted() {
	}
}
</script>
