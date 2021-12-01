import Vue from 'vue';
import Vuex from 'vuex';
import { boardStore } from './boardStore';
import { userStore } from './userStore';
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    boardStore,
    userStore,
  },
});
