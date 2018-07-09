// vue kit
import Vue from 'vue';
import Router from 'vue-router';

// views
import Login from 'Views/competitor/login.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'admin',
      component: Login,
      meta: {
        auth: false,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    console.log(to);
    console.log(111);
  } else {
    next();
  }
});

export default router;
