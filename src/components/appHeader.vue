<template>
  <section class="main-header-container">
    <div class="main-header-left">
      <div class="logo">
        <router-link to="/workspace">DigiTask</router-link>
      </div>
      <div class="main-header-workspace" @click="setType('workSpace')">
        Workspace
        <span class="arrow-down"><i class="fas fa-chevron-down"></i></span>
      </div>
      <div class="main-header-recent" @click="setType('recent')">
        Recent
        <span class="arrow-down"><i class="fas fa-chevron-down"></i></span>
      </div>
      <div class="main-header-starred" @click="setType('starred')">
        Starred
        <span class="arrow-down"><i class="fas fa-chevron-down"></i></span>
      </div>
      <div class="main-header-create">
        Create
        <span class="arrow-down"><i class="fas fa-chevron-down"></i></span>
      </div>
    </div>
    <div class="main-header-right">
      <div class="input-container">
        <input type="text" placeholder="Search" class="main-header-search" />
        <span class="search"><i class="fas fa-search"></i></span>
      </div>
      <div class="main-header-bell">bell</div>
      <div class="main-header-profile" @click="setType('profile')">PROFILE</div>
    </div>
    <header-dynamic class="abs" :type="type" v-if="type"></header-dynamic>
  </section>
</template>
<script>
import headerDynamic from "./headerDynamic.vue";
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
  },
};
</script>