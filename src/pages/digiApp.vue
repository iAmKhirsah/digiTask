<template>
  <div class="workspace-content">
    <!-- <div class="board-create-background" v-if="createMenu"></div> -->
    <board-create
      v-if="createMenu"
      @closeCreateMenu="closeCreateMenu"
      @createBoard="createBoard"
    />
    <div class="workspace-container">
      <div class="workspace-title" v-if="getStarredBoards.length">
        <span><i class="fas fa-star"></i></span>
        <h1>Starred Workspace</h1>
      </div>
      <div class="boards-container">
        <div class="boards-containers-my-boards">
          <div
            v-for="board in getStarredBoards"
            :key="board._id"
            class="board-card"
            :style="getBackground(board)"
          >
            <router-link :to="'/b/' + board._id" >
              <div class="board-card-content">
                <div class="board-card-title">{{ board.title }}</div>
                <div class="board-card-title-badges"></div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <!--  -->
 <div class="workspace-title" v-if="getRecentBoard.length">
        <span><i class="far fa-clock"></i></span>
        <h1>Recently Viewed</h1>
      </div>
      <div class="boards-container">
        <div class="boards-containers-my-boards" >
          <div
            v-for="board in getRecentBoard"
            :key="board._id"
            class="board-card"
            :style="getBackground(board)"
          >
            <router-link :to="'/b/' + board._id" >
              <div class="board-card-content">
                <div class="board-card-title">{{ board.title }}</div>
                <div class="board-card-title-badges"></div>
              </div>
            </router-link>
          </div>

         
        </div>
      </div>
   <!--  -->
      <div class="workspace-title">
        <span class="trello-logo"><i class="fab fa-trello"></i></span>
        <h1>Workspace</h1>
      </div>
      <div class="boards-container">
        <div class="boards-containers-my-boards" v-if="getBoards">
          <div
            v-for="board in getBoards"
            :key="board._id"
            class="board-card"
            :style="getBackground(board)"
          >
            <router-link :to="'/b/' + board._id" >
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
      // boards: this.$store.getters.boards,
      createMenu: false,
    };
  },
  async created() {
    await this.$store.dispatch({ type: "loadBoards" });
    // this.boards = this.$store.getters.boards;
  },
  methods: {
    openCreateMenu() {
      this.createMenu = true;
    },
    async closeCreateMenu() {
      //  await this.$store.dispatch({ type: "loadBoards" });
      this.createMenu = false;
      // this.boards = this.$store.getters.boards;
    },
    async createBoard(board) {
      let user = this.$store.getters.currUser;
      await this.$store.dispatch({
        type: "createBoard",
        board,user
      });
      this.createMenu = false;
    },
    getBackground(board) {
      if (board.style.backgroundColor)
        return { "background-color": board.style.backgroundColor };
      return {
        "background-image": `url(${require("@/assets/img/" +
          board.style.backgroundUrl)})`,
      };
    },
  },
  computed: {
    getBoards() {
      return this.$store.getters.boards;
    },
    getUser() {
      return this.$store.getters.currUser;
    },
    getStarredBoards() {
      let starredBoards = [];
      this.$store.getters.currUser.starred.forEach((boardId) => {
        this.getBoards.forEach((board) => {
          if (board._id === boardId) starredBoards.push(board);
        });
      });
      return starredBoards;
    },
    getRecentBoard(){
      let recentBoards = []
      this.$store.getters.currUser.recentBoards.forEach((boardId)=>{
         this.getBoards.forEach((board)=>{
          if(board._id === boardId) recentBoards.push(board)
        })
      })
      return recentBoards
    },
  },
  components: {
    boardCreate,
  },
  watch: {
    "this.getUser": {
      handler() {
        if (!this.getUser) this.$router.push("/");
      },
      immediate: true,
    },
  },
};
</script>