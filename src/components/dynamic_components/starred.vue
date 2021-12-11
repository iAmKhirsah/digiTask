<template>
  <section class="dynamic-starred card-layout nav-modal">
    <div class="header-layout">
      <header>Starred boards</header>
      <button @click="closeModal">
        <span class="icon-sm close-icon"> </span>
      </button>
    </div>
    <div class="placeholder" v-if="!getStarredBoards.length">Star important boards to access them quickly and easily.</div>
    <div v-for="board in getStarredBoards" :key="board._id">
      <div class="workspace-content" @click="goToBoard(board._id)">
        <div
          class="starred-board-background"
         
          :style="getBackground(board)"
        ></div>
        <div class="board-title">
          {{ board.title }}
        </div>
        <div class="board-box star" @click.stop="starredBoard(board._id)">
          <span><i class="fas fa-star"></i></span>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "starred",
  props: ["getUser", "getBoards", "getCurrBoard"],
  data() {
    return {
      starredBoards: null,
      user: null,
    };
  },
  created() {
    this.user = JSON.parse(JSON.stringify(this.getUser));
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    async goToBoard(boardId) {
      this.$emit("loadBoard", boardId);
      this.$nextTick(() => {
        this.$router.push(`/b/${boardId}`);
      });
    },
    starredBoard(boardId) {
      let idx = this.user.starred.indexOf(boardId);
      this.user.starred.splice(idx, 1);
      this.$emit("updateUser", this.user);
    },
    getBackground(board){
      if(board.style.backgroundColor)
      return {'background-color': board.style.backgroundColor}
      else return {'background-image': `url(${require('@/assets/img/'+board.style.backgroundUrl)})`}
    
    }
  },
  computed: {
    getStarredBoards() {
      let boards = [];
      this.getBoards.forEach((board) => {
        let starredBoards = this.user.starred.find(
          (boardId) => boardId === board._id
        )
        starredBoards ? boards.push(board) : "";
      })
      return boards;
    },
  },
};
</script>