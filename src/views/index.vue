<template>
  <div>
    hello world
  </div>
</template>

<script>
import ajax from "JSCommon/ajax";

export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    console.log(ajax)
    ajax.reqLogin({
      success: data => {
        console.log('success')
      }
    });
  },
  components: {}
};
</script>

<style>
.test {
  color: red;
}
</style>