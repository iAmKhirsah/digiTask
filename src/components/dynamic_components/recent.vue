<template>
  <section class="dynamic-recent card-layout nav-modal" v-click-outside="closeModal">
    <div class="header-layout">
      <header>Recent boards</header>
      <button @click="closeModal">
        <span class="icon-sm close-icon"> </span>
      </button>
    </div>
    <div v-for="board in getRecentBoards" :key="board._id">
      <div class="workspace-content" @click="goToBoard(board._id)">
        <div
          class="recent-board-background"
          :style="getBackground(board)"
        ></div>
        <div class="board-title">
          {{ board.title }}
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import vClickOutside from "v-click-outside";
export default {
  name: "recent",
  data() {
    return {
      recentBoards: null,
    };
  },
  methods: {
    closeModal() {
      console.log("hello");
      this.$emit("closeModal");
    },
    async goToBoard(boardId) {
      this.$emit("loadBoard", boardId);
      this.$nextTick(() => {
        this.$router.push(`/b/${boardId}`);
      });
    },
    getBackground(board) {
      if (board.style.backgroundColor)
        return { "background-color": board.style.backgroundColor };
      else
        return {
          "background-image": `url(${require("@/assets/img/" +
            board.style.backgroundUrl)})`,
        };
    },
  },
  computed: {
    getUser() {
      return this.$store.getters.currUser;
    },
    getBoards() {
      return this.$store.getters.boards;
    },
    getRecentBoards() {
      let recentBoards = [];
      this.getUser.recentBoards.forEach((boardId) => {
        this.getBoards.forEach((board) => {
          if (board._id === boardId) recentBoards.push(board);
        });
      });
      return recentBoards;
    },
  },
    directives: {
    clickOutside: vClickOutside.directive,
  },
};
</script>