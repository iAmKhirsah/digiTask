<template>
  <div v-if="board" class="board-details-container">
    <board-header :board="board" />
    <group-list :boardGroups="board.groups" />
    <router-view></router-view>
  </div>
</template>
<script>
import groupList from "../components/groupList.vue";
import boardHeader from "../components/boardHeader.vue";

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
  components: { groupList, boardHeader },
};
</script>