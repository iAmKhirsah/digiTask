<template>
  <div id="app">
    <div class="background"></div>
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>
<script>
import appHeader from "./components/appHeader.vue";
export default {
  components: {
    appHeader,
  },
};
</script>
