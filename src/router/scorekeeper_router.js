// vue kit
import Vue from 'vue';
import Router from 'vue-router';

// views
import Index from 'Views/scorekeeper/index.vue';

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
