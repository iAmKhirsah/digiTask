
<template>
  <section>
    <header class="board-header" :class="menuOpen" >
      <div class="board-header-left">
        <div class="board-box">
          <input
            ref="title"
            :style="inputWidth"
            v-model="boardTitle"
            @focus="$event.target.select()"
            v-on:keydown.enter="updateTitle"
            @blur="updateTitle"
          />
          <!-- v-click-outside="updateBoard(board)" -->
        </div>
        <div class="board-box star" @click="starredBoard">
          <span v-if="isStarred"><i class="fas fa-star"></i></span>
          <span v-else><i class="far fa-star"></i></span>
        </div>
        <div class="divider"></div>
        <div class="users-container">
          <div
            v-for="member in getBoardMembers"
            :key="member._id"
            class="members"
          >
            <!-- <span class="user-tag-name"
              ><img :src="member.imgUrl" class="image-settings"
            /></span> -->
            <span class="user-tag-name in-header">
              <img
                class="image-settings"
                :src="member.imgUrl"
                v-if="member.imgUrl"
              />
              <span v-else>{{ initials }}</span>
            </span>
          </div>
        </div>
        <div>
          <div class="board-box invite" @click="setType('invite')">
            <span class="icon-sm add-member-icon"></span> Invite
          </div>
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
      :board="getCurrBoard"
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
      boardTitle: "",
    };
  },
  created() {
    this.currUser = JSON.parse(JSON.stringify(this.getCurrUser));
    this.boardTitle = JSON.parse(JSON.stringify(this.getCurrBoard.title));
  },
  methods: {
    updateBoard(board) {
      this.$emit("updateBoard", board);
    },
    removeBoard(boardId) {
      this.$emit("removeBoard", boardId);
    },
    updateTitle() {
      if (this.boardTitle.match(/^\s*$/)) {
        this.boardTitle = JSON.parse(JSON.stringify(this.getCurrBoard.title));
        return;
      }
      this.$nextTick(() => {
        this.$refs.title.blur();
      });
      let board = JSON.parse(JSON.stringify(this.getCurrBoard));
      board.title = this.boardTitle;
      this.updateBoard(board);
    },
    starredBoard() {
      let idx = this.getCurrUser.starred.indexOf(this.getCurrBoard._id);
      if (idx > -1) this.currUser.starred.splice(idx, 1);
      else this.currUser.starred.push(this.getCurrBoard._id);
      let user = JSON.parse(JSON.stringify(this.currUser));
        this.$store.dispatch({ type: "updateUser", user });
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
      return { width: this.boardTitle.length * 10 + 24 + "px" };
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
    initials() {
      let initials = this.getCurrUser.fullname.split(" ");
      if (initials.length > 1) {
        initials = initials.shift().charAt(0) + initials.pop().charAt(0);
      } else {
        initials = this.getCurrUser.fullname.substring(0, 2);
      }
      return initials.toUpperCase();
    },
  },
  components: {
    headerDynamic,
    showMenu,
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  // watch: {
  //   "$route.params.boardId": {
  //     handler() {
  //       if (this.board._id !== this.$route.params.boardId) {
  //         console.log('hello');
  //         this.boardTitle = this.board.title;
  //       }
  //     },
  //     immediate: true
  //   },
  // },
};
</script>