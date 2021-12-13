<template>
  <div>
    <section class="main-header-container">
      <div class="main-header-left">
        <span class="trello-logo"><i class="fab fa-trello"></i></span>
        <div class="logo main-header-tabs">
          <router-link to="/workspace">DigiTask</router-link>
        </div>
        <!-- <div class="main-header-tabs" @click="setType('workSpace')">
          Workspace
          <span class="arrow-down"><i class="fas fa-chevron-down"></i></span>
        </div> -->
        <div
          class="main-header-tabs recent"
          @click="setType('recent')"
          title="Recent"
        >
          <!-- Recent -->
          <span class="arrow-down"><i class="fas fa-chevron-down"></i></span>
        </div>
        <div
          class="main-header-tabs starred"
          @click="setType('starred')"
          title="Starred"
        >
          <!-- Starred -->
          <span class="arrow-down"><i class="fas fa-chevron-down"></i></span>
        </div>
        <div class="more-btn">
          <button @click="moreBtn">More</button>
          <div v-if="moreMenu" class="more-menu" v-click-outside="moreBtn">
            <div class="more-menu-item" @click="setType('recent')">
              <div class="main-header-tabs recent" title="Recent"></div>
              <span class="arrow-down"
                ><i class="fas fa-chevron-down"></i
              ></span>
            </div>
            <div class="more-menu-item" @click="setType('starred')">
              <div class="main-header-tabs starred" title="Starred"></div>
              <span class="arrow-down"
                ><i class="fas fa-chevron-down"></i
              ></span>
            </div>
          </div>
        </div>
        <div
          class="main-header-tabs create"
          @click="setType('create')"
          title="Create board"
        >
          <!-- <span class="create-text">Create</span> <span>+</span> -->
        </div>
      </div>

      <div class="main-header-right">
        <div class="input-container">
          <!-- Ilya  -->
          <filter-app-header
            class="main-header-search"
            :boards="getBoards"
            title="Search cards"
          />
          <!-- <input type="text" placeholder="Search" class="main-header-search" /> -->
          <span class="search"><i class="fas fa-search"></i></span>
        </div>
        <div class="main-header-bell"><i class="far fa-bell"></i></div>
        <div
          class="main-header-profile user-tag-name in-header"
          @click="setType('profile')"
          v-if="getUser"
          :title="getUser.fullname"
        >
          <img
            class="image-settings"
            :src="getUser.imgUrl"
            v-if="getUser.imgUrl"
          />
          <span v-else>{{ initials }}</span>
        </div>
      </div>
    </section>
    <header-dynamic
      @createBoard="createBoard"
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
      moreMenu: false,
    };
  },
  async created() {
    await this.$store.dispatch({ type: "loadBoards" });
    this.boards = this.getBoards;
  },
  methods: {
    setType(type) {
      this.type = type;
      this.moreMenu = false;
    },
    moreBtn() {
      this.moreMenu = !this.moreMenu;
    },
    async createBoard(board) {
      let user = this.$store.getters.currUser;
      console.log("user", user);
      await this.$store.dispatch({
        type: "createBoard",
        board,
        user,
      });
      this.createMenu = false;
      let newBoardId =
        this.$store.getters.boards[this.$store.getters.boards.length - 1]._id;
      this.$router.push("/b/" + newBoardId);
    },
    updateUser(user) {
      console.log * user;
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