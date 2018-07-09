import 'Css/common/base.css';
// vue
import Vue from 'vue';
import router from '../router/competitor_router';

// Vue.config.debug = true
Vue.config.devtools = true;

const vm = new Vue({
  el: '#app',
  router,
});

export default vm;
