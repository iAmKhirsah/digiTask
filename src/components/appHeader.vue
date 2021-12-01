<template>
  <section class="main-header-container">
    <div class="main-header-left">
      <div class="logo">
        <router-link to="/workspace"></router-link>
      </div>
      <div class="main-header-workspace" @click="setType('workSpace')">
        Workspace
      </div>
      <div class="main-header-recent" @click="setType('recent')">Recent</div>
      <div class="main-header-starred" @click="setType('starred')">Starred</div>
      <div class="main-header-create">Create</div>
    </div>
    <div class="main-header-right">
      <input type="text" placeholder="Search" class="main-header-search" />
      <div class="main-header-bell">BELL</div>
      <div class="main-header-profile" @click="setType('profile')">PROFILE</div>
    </div>
    <header-dynamic :type="type" v-if="type"></header-dynamic>
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