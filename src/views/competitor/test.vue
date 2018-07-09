<template>
  <div id="login">
    <login-form @login="login"></login-form>
    <countdown timestamp="1531186363000" color="red"></countdown>
  </div>
</template>

<script>
import LoginForm from 'Components/common/login_form'
import Countdown from 'Components/common/countdown'

export default {
  data() {
    return {}
  },
  methods: {
    login(account, password) {
      console.log(account)
      console.log(password);
    }
  },
  mounted() { },
  components: {
    'login-form': LoginForm,
    'countdown': Countdown,
  },
}
</script>

<style>
</style>