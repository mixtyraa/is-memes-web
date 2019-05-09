import Vue from 'vue';
import Router from 'vue-router';
import FromAddMeme from '@/views/FormAddMeme.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/addMeme',
      name: 'addMeme',
      component: FromAddMeme,
    },
  ],
});
