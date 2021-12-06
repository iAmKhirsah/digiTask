<template>
  <main>
    <div :class="isDefault" :style="getImgOrColor"></div>
    <div id="app">
      <app-header></app-header>
      <router-view></router-view>
    </div>
  </main>
</template>
<script>
import appHeader from "./components/appHeader.vue";
export default {
  components: {
    appHeader,
  },
  data() {
    return {
      routes: ["/", "/workspace", "/signup"],
      noBgc: false,
    };
  },
  computed: {
    getBoard() {
      return this.$store.getters.getCurrBoard;
    },
    getImgOrColor() {
      if (this.getBoard)
        return this.getBoard.style.backgroundColor
          ? "background:" + this.getBoard.style.backgroundColor
          : "background-image:" + `url('${this.getBoard.style.backgroundUrl}')`;
    },
    isDefault() {
      return this.noBgc ? "no-background" : "background";
    },
  },
  watch: {
    "$route.path": {
      handler() {
        if (this.routes.includes(this.$route.path)) this.noBgc = true;
        else this.noBgc = false;
      },
      immediate: true,
    },
  },
};
</script>
