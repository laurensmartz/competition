<template>
  <div>
    hello world!!!
  </div>
</template>

<script>
import request from "JS/competitor/request";

export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    request.login({
      data: {
        username: "admin",
        password: "123456"
      },
      successFun: (responseData) => {
        console.log(responseData);
        console.log("success!");
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