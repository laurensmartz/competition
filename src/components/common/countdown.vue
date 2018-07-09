<template>
  <div class="countdown">
    <span v-text="remainTime" :style="'color:' + color"></span>
  </div>
</template>

<script>
import utils from 'JS/common/utils'

export default {
  props: {
    timestamp: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: '#000',
    }
  },
  data() {
    return {
      remainTime: null,
    }
  },
  methods: {},
  mounted() {
    setInterval(() => {
      this.remainTime = utils.remainTime(this.timestamp, 1)
    }, 1000)
  },
  components: {},
}
</script>

<style>
</style>