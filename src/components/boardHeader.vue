
<template>
  <section>
    <header class="board-header" :class="menuOpen" v-click-outside="setType">
      <div class="board-header-left">
        <div class="board-box">
          <input
            :style="inputWidth"
            v-model="board.title"
            @focus="$event.target.select()"
          />
        </div>
        <div class="board-box star" @click="starredBoard">
          <span v-if="isStarred"><i class="fas fa-star"></i></span>
          <span v-else><i class="far fa-star"></i></span>
        </div>
        <div class="users-container">
          <div
            v-for="member in getBoardMembers"
            :key="member._id"
            class="members"
          >
            <span class="user-tag-name"
              ><img :src="member.imgUrl" class="image-settings"
            /></span>
          </div>
        </div>
        <div>
          <div class="board-box invite" @click="setType('invite')">Invite</div>
        </div>
      </div>

      <div class="board-header-right">
        <div class="board-box">
          <span class="material-icons"> filter_list </span>
          <span class="filter">Filter</span>
        </div>
        <div class="board-box" @click="openMenu" :class="hideButton">
          <button class="group-header-edit-btn">
            <span class="icon-sm menu-dots"></span>
          </button>
          <span class="show-more"> Show Menu</span>
        </div>
      </div>
    </header>
    <show-menu
      :board="board"
      @updateBoard="updateBoard"
      @removeBoard="removeBoard"
      @closeMenu="closeMenu"
      :class="hideMenu"
    />

    <header-dynamic
      @closeModal="closeModal"
      @updateBoard="updateBoard"
      :type="type"
      :getCurrBoard="getCurrBoard"
      v-if="type"
    ></header-dynamic>
  </section>
</template>


// need to fix the click outside of the invite dynamic header

<script>
import headerDynamic from "./headerDynamic.vue";
import vClickOutside from "v-click-outside";
import showMenu from "../components/showMenu.vue";
export default {
  name: "boardHeader",
  props: ["board", "showMenuOpen"],
  data() {
    return {
      type: null,
      currUser: null,
    };
  },
  created() {
    this.currUser = JSON.parse(JSON.stringify(this.getCurrUser));
  },
  methods: {
    updateBoard(board) {
      this.$emit("updateBoard", board);
    },
    removeBoard(boardId) {
      this.$emit("removeBoard", boardId);
    },
    starredBoard() {
      let idx = this.currUser.starred.indexOf(this.getCurrBoard._id);
      if (idx > -1) this.currUser.starred.splice(idx, 1);
      else this.currUser.starred.push(this.getCurrBoard._id);
      this.$store.dispatch({ type: "updateUser", user: this.currUser });
    },
    setType(type) {
      this.type = type;
    },
    closeModal() {
      this.setType("");
    },
    closeMenu() {
      this.$emit("closeMenu");
    },
    toggleMenu() {
      this.$emit("toggleMenu");
    },
    openMenu() {
      this.$emit("openMenu");
    },
  },
  computed: {
    inputWidth() {
      if (!this.board.title) return;
      return { width: this.board.title.length * 10 + 24 + "px" };
    },
    getBoardMembers() {
      return this.$store.getters.getCurrBoard.members;
    },
    getCurrUser() {
      return this.$store.getters.currUser;
    },
    getCurrBoard() {
      return this.$store.getters.getCurrBoard;
    },
    isStarred() {
      if (!this.currUser.starred || !this.currUser.starred.length) return false;
      let starredBoard = this.currUser.starred.find((starred) => {
        return starred === this.getCurrBoard._id;
      });
      return starredBoard ? true : false;
    },
    menuOpen() {
      return { "menu-open": this.showMenuOpen };
    },
    hideMenu() {
      return { hidden: !this.showMenuOpen, open: this.showMenuOpen };
    },
    hideButton() {
      return { hidden: this.showMenuOpen };
    },
  },
  components: {
    headerDynamic,
    showMenu,
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
};
</script>