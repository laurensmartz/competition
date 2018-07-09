<template>
  <div class="login-form">
    <div class="login-form-box">
      <div class="title"
        v-text="title">
      </div>
      <div class="account-password">
        <input type="text"
          name=""
          placeholder="账号"
          class="account"
          id="account">
        <input type="password"
          name=""
          placeholder="密码"
          id="password">
      </div>
      <div class="submit">
        <a @click="login"
          class="primary-btn">登录</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '中锐竞赛管理平台'
    }
  },
  data() {
    return {}
  },
  methods: {
    login() {
      this.$emit('login')
    }
  },
  mounted() { },
  components: {},
}
</script>

<style lang="less">
.login-form-box {
  margin: 100px 0 0 100px;
  box-shadow: 0 4px 10px lightgray;
  width: 300px;
  height: 260px;
  background-color: #fff;
  border-radius: 5px;
}
.title {
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.account-password {
  box-sizing: border-box;
  padding: 9px 0;
  height: 100px;
  text-align: center;
  .account {
    margin-bottom: 14px;
  }
}
.submit {
  height: 100px;
  text-align: center;
  .primary-btn {
    margin-top: 20px;
    display: inline-block;
    width: 240px;
  }
}
</style>