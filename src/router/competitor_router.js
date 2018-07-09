// vue kit
import Vue from 'vue';
import Router from 'vue-router';

// views
import Index from 'Views/competitor/index.vue';
import Test from 'Views/competitor/test.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        auth: false,
      },
    },
    {
      path: '/test',
      name: 'test',
      component: Test,
      meta: {
        auth: false,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    console.log('auth here');
  } else {
    next();
  }
});

export default router;
