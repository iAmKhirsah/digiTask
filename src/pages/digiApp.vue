<template>
  <div class="boards-container">
    <div
      v-for="board in boards"
      :key="board._id"
      class="board-card"
      :style="board.style"
    >
      <p>board style is inline in the v for</p>
      <router-link :to="'/b/' + board._id">
        <h2>{{ board.title }}</h2>
      </router-link>
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