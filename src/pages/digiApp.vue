<template>
  <div class="boards-container">
    <div v-for="board in boards" :key="board._id" class="board-card">
      <header class="border-header">
        <div>
          <h1 class="board-box">{{ board.title }}</h1>
        </div>
        <p>board background/img goes here</p>
      </header>
    </div>
  </div>
</template>
<script>
export default {
  name: "digiApp",
  data() {
    return {
      boards: null,
    };
  },
  async created() {
    await this.$store.dispatch({ type: "loadBoards" });
    this.boards = this.$store.getters.boards;
  },
};
</script>