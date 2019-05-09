import Vue from 'vue';
import './plugins/vuetify';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.post.Accept = 'application/json';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
