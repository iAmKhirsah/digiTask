<template>
  <main>
    <div :class="isDefault" :style="getImgOrColor"></div>
    <div id="app">
      
      <app-header v-if="header"></app-header>
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
      // homeRoute: "/",
      // signRoute: '/signup',
      noHeaderRoutes: ["/", "/signup"],
      noBgc: false,
      header: true,
    };
  },
  async created() {
    this.$store.commit({ type: "setLoggedinUser" });
    // let user = this.$store.getters.currUser
    // await this.$store.dispatch({type:'getUserById',userId:user._id})
  },
  computed: {
    getBoard() {
      return this.$store.getters.getCurrBoard;
    },
    getImgOrColor() {
      if (this.getBoard)
        return this.getBoard.style.backgroundColor
          ? "background:" + this.getBoard.style.backgroundColor
          : "background-image:" + `url(${require('@/assets/img/'+this.getBoard.style.backgroundUrl)})`;
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
        if (this.noHeaderRoutes.includes(this.$route.path)) this.header = false;
        else this.header = true;
      },
      immediate: true,
    },
  },
};
</script>
