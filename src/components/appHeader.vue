<template>
  <div>
    <section class="main-header-container" v-click-outside="setType">
      <div class="main-header-left">
        <span class="trello-logo"><i class="fab fa-trello"></i></span>
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
        <div class="main-header-tabs create" @click="setType('create')">
          Create
        </div>
      </div>
      <div class="main-header-right">
        <div class="input-container">
          <filter-app-header class="main-header-search" :boards="getBoards" />
          <!-- <input type="text" placeholder="Search" class="main-header-search" /> -->
          <span class="search"><i class="fas fa-search"></i></span>
        </div>
        <div class="main-header-bell"><i class="far fa-bell"></i></div>
        <div
          class="main-header-profile user-tag-name in-header"
          @click="setType('profile')"
          v-if="getUser"
        >
          <img class="image-settings" :src="getUser.imgUrl" v-if="getUser.imgUrl" />
          <span v-else>{{ initials }}</span>
        </div>
      </div>
    </section>
    <header-dynamic
      @closeModal="closeModal"
      @updateUser="updateUser"
      @loadBoard="loadBoard"
      class="abs"
      :type="type"
      :getUser="getUser"
      :getBoards="getBoards"
      v-if="type"
    ></header-dynamic>
  </div>
</template>
<script>
import headerDynamic from "./headerDynamic.vue";
import filterAppHeader from "./filterAppHeader.vue";
import vClickOutside from "v-click-outside";
export default {
  name: "appHeader",
  components: {
    headerDynamic,
    filterAppHeader,
  },
  data() {
    return {
      type: null,
      boards: null,
    };
  },
  async created() {
    await this.$store.dispatch({ type: "loadBoards" });
    this.boards = this.getBoards;
  },
  methods: {
    setType(type) {
      this.type = type;
    },
    updateUser(user) {
      console.log*user
      this.$store.dispatch({ type: "updateUser", user });
    },
    closeModal() {
      this.setType("");
    },
    loadBoard(boardId) {
      console.log(boardId);
      this.$store.dispatch({ type: "loadAndWatchBoard", boardId });
    },
  },
  computed: {
    getBoards() {
      return this.$store.getters.boards;
    },
    getUser() {
      return this.$store.getters.currUser;
    },
    initials() {
      console.log(this.getUser);
      let initials = this.getUser.fullname.split(" ");
      if (initials.length > 1) {
        initials = initials.shift().charAt(0) + initials.pop().charAt(0);
      } else {
        initials = this.getUser.fullname.substring(0, 2);
      }
      return initials.toUpperCase();
    },
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
};
</script>