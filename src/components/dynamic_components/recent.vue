<template>
  <section class="dynamic-starred card-layout nav-modal">
    <div class="header-layout">
      <header>Recent boards</header>
      <button @click="closeModal">
        <span class="icon-sm close-icon"> </span>
      </button>
    </div>
    <div v-for="board in getUser.recentBoards" :key="board._id">
      <div class="workspace-content" @click="goToBoard(board._id)">
        <div
          class="starred-board-background"
          :style="'background:' + board.style.backgroundColor"
        ></div>
        <div class="board-title">
          {{ board.title }}
        </div>
      </div>
    </div>
  </section>
</template>
<script>
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
  },
  computed: {
    getUser() {
      return this.$store.getters.currUser;
    },
  },
};
</script>