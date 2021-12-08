<template>
  <div class="workspace-content">
    <!-- <div class="board-create-background" v-if="createMenu"></div> -->
    <board-create
      v-if="createMenu"
      @closeCreateMenu="closeCreateMenu"
      @createBoard="createBoard"
    />
    <div class="workspace-container" v-if="!createMenu">
      <div class="workspace-title">
        <span class="trello-logo"><i class="fab fa-trello"></i></span>
        <h1>Workspace</h1>
      </div>
      <div class="boards-container">
        <div class="boards-containers-my-boards">
          <div
            v-for="board in boards"
            :key="board._id"
            class="board-card"
            :style="board.style"
          >
            <router-link :to="'/b/' + board._id">
              <div class="board-card-content">
                <div class="board-card-title">{{ board.title }}</div>
                <div class="board-card-title-badges"></div>
              </div>
            </router-link>
          </div>
          <div class="board-card-add">
            <div class="board-card-title" @click="openCreateMenu">
              Create new board
              <span class="material-icons plus"> add </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import boardCreate from "../components/boardCreate.vue";
export default {
  name: "digiApp",
  data() {
    return {
      boards: null,
      createMenu: false,
    };
  },
  async created() {
    await this.$store.dispatch({ type: "loadBoards" });
    this.boards = this.$store.getters.boards;
  },
  methods: {
    openCreateMenu() {
      this.createMenu = true;
    },
    closeCreateMenu() {
      this.createMenu = false;
    },
    createBoard(board) {
      let user = this.$store.getters.currUser;
      this.$store.dispatch({ type: "createBoard", board, user });
    },
  },
  components: {
    boardCreate,
  },
};
</script>