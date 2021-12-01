<template>
  <div class="boards-container">
    <div v-for="board in boards" :key="board._id" class="board-card">
      <p>{{ board.title }}</p>
      <!-- <p>board background/img goes here</p> -->
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