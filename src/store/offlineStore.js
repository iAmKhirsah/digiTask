import Vue from 'vue';
import Vuex from 'vuex';
import cache from '../plugins/cache';
import sync from './plugins/sync';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    initialized: false,
  },
  mutations: {
    loadFromCache(state, cached) {
      if (cached) {
        Object.keys(cached).forEach((key) => {
          state[key] = Object.assign({}, state[key], cached[key]);
        });
      }

      state.initialized = true;
    },
  },
  plugins: [cache, sync],
});
