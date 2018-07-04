<template>
  <div>
    hello world!!!
  </div>
</template>

<script>
import request from 'JSCommon/competitor/request'

export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    console.log(request)
    request.login({
      successFun: () => {
        console.log('success');
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