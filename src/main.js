import Vue from 'vue';
import app from './app.vue';
import './registerServiceWorker';
import router from './router/router';
import mainStore from './store/mainStore';

Vue.config.productionTip = false;

new Vue({
  router,
  store: mainStore,
  render: (h) => h(app),
}).$mount('#app');
