import Vue from 'vue';
import app from './app.vue';
import './registerServiceWorker';
import router from './router/router';
import mainStore from './store/mainStore';
import '../src/style/style.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  store: mainStore,
  render: (h) => h(app),
}).$mount('#app');
