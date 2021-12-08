
<template>
  <section>
    <header class="board-header" v-click-outside="setType">
      <div class="board-header-left">
        <div class="board-box">
          <input
            :style="inputWidth"
            v-model="board.title"
            @focus="$event.target.select()"
          />
        </div>
        <div class="board-box star" @click="toggleStar">
          <span v-if="!isStarred"><i class="far fa-star"></i></span>
          <span v-else><i class="fas fa-star"></i></span>
        </div>
        <div
          v-for="member in getBoardMembers"
          :key="member._id"
          class="members"
        >
          <span class="user-tag-name"
            ><img :src="member.imgUrl" class="image-settings"
          /></span>
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
        <div class="board-box" @click="openShowMenu">
          <button class="group-header-edit-btn">
            <span class="material-icons"> more_horiz </span>
          </button>
          <span class="show-more"> Show Menu</span>
        </div>
      </div>
    </header>
    <show-menu
      :board="board"
      v-if="showMenuOpen"
      @closeShowMenu="closeShowMenu"
      @updateBoard="updateBoard"
    />
    
    <header-dynamic
      @closeModal="closeModal"
      @updateBoard="updateBoard"
      :type="type"
      :board="board"
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
  props: ["board"],
  data() {
    return {
      isStarred: false,
      type: null,
      showMenuOpen: false,
    };
  },
  created() {},
  computed: {
    inputWidth() {
      if(!this.board.title) return
      return { width: this.board.title.length * 10 + 24 + "px" };
    },
    getBoardMembers() {
      return this.$store.getters.getCurrBoard.members;
    },
  },
  methods: {
    updateBoard(board) {
      this.$emit('updateBoard',board)
      // this.$store.dispatch({ type: "updateBoard", board });
    },
    openShowMenu() {
      this.showMenuOpen = true;
    },
    closeShowMenu() {
      this.showMenuOpen = false;
    },
    toggleStar() {
      this.isStarred = !this.isStarred;
    },
    setType(type) {
      this.type = type;
    },
    closeModal() {
      this.setType("");
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