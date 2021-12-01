<template>
  <div v-if="board" class="board-details-container">
    <group-list :boardGroups="board.groups" />
  </div>
</template>
<script>
import groupList from "../components/groupList.vue";
export default {
  name: "boardDetails",
  data() {
    return {
      board: null,
    };
  },
  async created() {
    let boardId = this.$route.params.boardId;
    await this.$store.dispatch({ type: "loadAndWatchBoard", boardId });
    this.board = this.$store.getters.currBoard;
  },
  components: { groupList },
};
</script>