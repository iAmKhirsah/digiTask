<template>
  <div class="board-details-container">
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
  created() {
    this.board = boardService.getBoardById(this.$router.params.boardId);
  },
  components: { groupList },
};
</script>