<template>
  <section class="main-header-container" v-click-outside="setType">
    <div class="main-header-left">
      <div class="logo main-header-tabs">
        <router-link to="/workspace">DigiTask</router-link>
      </div>
      <div class="main-header-tabs" @click="setType('workSpace')">
        Workspace
        <span class="arrow-down"><i class="fas fa-chevron-down"></i></span>
      </div>
      <div class="main-header-tabs" @click="setType('recent')">
        Recent
        <span class="arrow-down"><i class="fas fa-chevron-down"></i></span>
      </div>
      <div class="main-header-tabs" @click="setType('starred')">
        Starred
        <span class="arrow-down"><i class="fas fa-chevron-down"></i></span>
      </div>
      <div class="main-header-tabs">
        Create
        <span class="arrow-down"><i class="fas fa-chevron-down"></i></span>
      </div>
    </div>
    <div class="main-header-right">
      <div class="input-container">
        <input type="text" placeholder="Search" class="main-header-search" />
        <span class="search"><i class="fas fa-search"></i></span>
      </div>
      <div class="main-header-bell"><i class="far fa-bell"></i></div>
      <div class="main-header-profile user-tag-name in-header" @click="setType('profile')">DR</div>
    </div>
    <header-dynamic  @closeModal="closeModal" class="abs" :type="type" v-if="type"></header-dynamic>
  </section>
</template>
<script>
import headerDynamic from "./headerDynamic.vue";
import vClickOutside from "v-click-outside";
export default {
  name: "appHeader",
  components: {
    headerDynamic,
  },
  data() {
    return {
      type: null,
    };
  },
  methods: {
    setType(type) {
      this.type = type;
    },
    closeModal(){
       this.setType('')
    }
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
};
</script>