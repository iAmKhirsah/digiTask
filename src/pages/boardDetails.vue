<template>
  <div ref="boardPage">
    <!-- <div
      class="mouse "
      v-for="(boardUser, idx) in getBoardUsers"
      :style="{ top: boardUser.y + 'px', left: boardUser.x + 'px' }"
      :key="idx"
      ><i class="fas fa-mouse-pointer" :style="{color:getRandomInt}" v-if="boardUser"></i><img class='mouse-image' :title="boardUser.user.username" :src="boardUser.user.imgUrl" v-if="boardUser"/></div
    > -->
    <div v-if="isLoading" class="loading-screen" :style="getImgOrColor">
      <div class="container">
        <div class="item item-1"></div>
        <div class="item item-2"></div>
        <div class="item item-3"></div>
        <div class="item item-4"></div>
      </div>
    </div>
    <div
      v-if="getCurrBoard && !isLoading"
      class="board-details-container"
      v-dragscroll:nochilddrag
      :class="menuOpen"
    >
      <board-header
        v-if="board"
        :board="getCurrBoard"
        @updateBoard="updateBoard"
        @removeBoard="removeBoard"
        :showMenuOpen="showMenuOpen"
        @toggleMenu="toggleMenu"
        @closeMenu="closeMenu"
        @openMenu="openMenu"
      />
      <div class="group-list-container">
        <Container
          drag-class="card-ghost"
          drop-class="card-ghost-drop"
          orientation="horizontal"
          drag-handle-selector=".draggable-item"
          :get-child-payload="getChildPayload"
          :drop-placeholder="dropPlaceholderOptions"
          @drop="onDropGroup"
        >
          <Draggable v-for="(group, idx) in boardGroups" :key="idx">
            <group-list
              class="draggable-item"
              :group="group"
              :idx="idx"
              @addTask="addTask"
              @updateGroup="updateGroup"
              @updateTask="updateTask"
              @deleteGroup="deleteGroup"
              @miniPreview="miniPreview"
              :isMiniPreview="isMiniPreview"
              :board="getCurrBoard"
            />
          </Draggable>
        </Container>

        <div>
          <form
            class="add-list-form"
            v-if="isNewGroup"
            v-on:keydown.enter="addGroup"
            v-click-outside="toggleNewGroup"
          >
            <textarea
              class="textarea-another-list"
              ref="list"
              @keydown.enter.prevent
              oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
              onfocus='this.style.height = "";this.style.height = this.scrollHeight + "px"'
              v-model="newGroup.title"
              maxlength="512"
              placeholder="Enter list title..."
            />
            <div class="add-list-form-btns">
              <button class="add-task-btn" @click="addGroup">Add list</button>
              <button
                class="add-task-close-btn"
                type="button"
                @click="toggleNewGroup"
              >
                <span class="icon-lg close-icon"></span>
              </button>
            </div>
          </form>

          <button v-else @click="toggleNewGroup" class="add-another-list">
            <span class="material-icons"> add </span
            ><span class="title">Add another List</span>
          </button>
        </div>
      </div>

      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import groupList from "../components/groupList.vue";
import boardHeader from "../components/boardHeader.vue";
import { dragscroll } from "vue-dragscroll";
import vClickOutside from "v-click-outside";
import { Container, Draggable } from "vue-smooth-dnd";
import { socketService } from "../services/socketService.js";

export default {
  name: "boardDetails",
  data() {
    return {
      board: null,
      isNewGroup: false,
      newGroup: {},
      isMiniPreview: true,
      newTask: {},
      dropPlaceholderOptions: {
        className: "drop-preview",
        animationDuration: "150",
        showOnTop: false,
      },
      showMenuOpen: false,
      updatingBoard: null,
      dndCount: 0,
      boardUsers: [],
       colors: [
        "rgb(0, 121, 191)",
        "rgb(210, 144, 52)",
        "rgb(81, 152, 57)",
        "rgb(176, 70, 50)",
        "rgb(137, 96, 158)",
        "rgb(205, 90, 145)",
        "rgb(75, 191, 107)",
        "rgb(0, 174, 204)",
        "rgb(131, 140, 145)",
      ],
    };
  },

  async created() {
    try {
      this.newGroup = { ...this.$store.getters.getEmptyGroup };
      this.newTask = { ...this.$store.getters.getEmptyTask };
      let boardId = this.$route.params.boardId;
      await this.$store.dispatch({ type: "loadBoards" });
      await this.$store.dispatch({ type: "loadAndWatchBoard", boardId });
      this.board = this.getCurrBoard;
      this.$store.dispatch({
        type: "addRecent",
        boardId: this.board._id,
        user: JSON.parse(JSON.stringify(this.getUser)),
      });
      // socketService.on("mouseMove", (ev) => {
      //   const idx = this.boardUsers.findIndex((currMouse) => currMouse.user._id === ev.user._id);
      //   if (idx === -1) {
      //     this.boardUsers.push(ev);
      //   } else {
      //     this.boardUsers.splice(idx, 1, ev);
      //   }
      // });
      if (!this.board) this.$router.push("/");
      if (!this.board.groups) return;
     

    } catch (err) {
      console.log("Couldnt create and watch board ", err);
      this.$router.push("/workspace");
    }
  },
  destroyed() {
    // console.log('destroyed')
    // this.board = null;
    //    const idx = this.boardUsers.findIndex((currMouse) => currMouse.user._id === this.$store.getters.currUser);
    //    if(idx >-1) this.boardUsers.splice(idx, 1);
    //    socketService.off("mouseMove")
    //    console.log(idx)
    //    console.log(this.boardUsers)
      // this.$refs.boardPage.removeEventListener("mousemove")
    // this.$refs.boardPage.removeEventListener("mousemove" , (ev) => {
    //   socketService.emit("mouseMove", {
    //     x: ev.pageX,
    //     y: ev.pageY,
    //     user: this.getUser|| "Guest",
    //   });
    // });
  },
  methods: {
    handleIcon() {
      const favicon = document.getElementById("favicon");
      if (this.board.style.backgroundUrl) {
        favicon.href = require(`@/assets/img/${this.board.style.backgroundUrl}`);
      } else favicon.href = "https://trello.com/favicon.ico";
    },
    async removeBoard(boardId) {
      try {
        await this.$store.dispatch({ type: "removeBoard", boardId });
      } catch (err) {
        console.log("couldnt remove board");
      }
    },
    async updateGroup(group) {
      try {
        let updatedGroup = JSON.parse(JSON.stringify(group));
        await this.$store.dispatch({
          type: "updateGroup",
          group: updatedGroup,
        });
      } catch (err) {
        console.log("couldnt update group ", err);
      }
    },
    async updateTask(task) {
      await this.$store.dispatch({ type: "updateTask", task });
    },
    toggleNewGroup() {
      this.isNewGroup = !this.isNewGroup;
      if (this.isNewGroup)
        this.$nextTick(() => {
          this.newGroup.title = "";
          this.$refs.list.focus();
        });
    },
    miniPreview() {
      this.isMiniPreview = !this.isMiniPreview;
    },
    async updateBoard(board) {
      try {
        await this.$store.dispatch({ type: "updateBoard", board });
        this.board = JSON.parse(JSON.stringify(this.getCurrBoard));
        // this.board = this.getCurrBoard
      } catch (err) {
        console.log("Couldnt update board", err);
      }
    },
    async addGroup() {
      try {
        if (this.newGroup.title.match(/^\s*$/) || !this.newGroup.title.length) {
          this.newGroup.title = "";
          this.$nextTick(() => {
            this.$refs.list.focus();
          });
          return;
        }
        // let group = { ...this.newGroup };
        let group = this.newGroup;
        await this.$store.dispatch({ type: "addGroup", group });
        this.newGroup = { ...this.$store.getters.getEmptyGroup };
        this.newGroup.title;
      } catch (err) {
        console.log("Couldnt add group", err);
      }
    },
    async deleteGroup(group) {
      try {
        let groupId = group.id;
        await this.$store.dispatch({ type: "removeGroup", groupId });
      } catch (err) {}
    },
    async addTask(task, idx) {
      let user = { ...this.$store.getters.currUser };
      try {
        await this.$store.dispatch({
          type: "addTask",
          taskRaw: { task, idx, user },
        });
        this.$store.dispatch({
          type: "addActivity",
          activity: {
            task,
            txt: `created ${task}`,
            user: this.getUser,
          },
        });
      } catch (err) {
        console.log("Couldnt add task", err);
      }
    },
    async onDropGroup(dropResult) {
      try {
        await this.$store.dispatch({ type: "applyDragGroup", dropResult });
        this.board = this.getCurrBoard;
      } catch (err) {
        console.log("Couldnt drag group", err);
      }
    },
    getChildPayload(groupIndex, itemIndex) {
      // if (!this.getCurrBoard.groups[groupIndex].tasks)
      //   return;
      return this.getCurrBoard.groups[groupIndex].tasks[itemIndex];
    },
    toggleMenu() {
      this.showMenuOpen = !this.showMenuOpen;
    },
    closeMenu() {
      this.showMenuOpen = false;
    },
    openMenu() {
      this.showMenuOpen = true;
    },
  },
  computed: {
    getBoardUsers(){
      return this.boardUsers
    },
    boardGroups() {
      return this.$store.getters.getCurrBoard.groups;
    },
    getRandomInt(){
      return '#'+Math.floor(Math.random()*16777215).toString(16);
    },
    getCurrBoard() {
      return this.$store.getters.getCurrBoard;
    },
    menuOpen() {
      return { "menu-open": this.showMenuOpen };
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
    getUser() {
      return this.$store.getters.currUser;
    },
    getGroup() {
      return this.$store.getters.getCurrGroup;
    },
    getImgOrColor() {
      if (this.getBoard)
        return this.getBoard.style.backgroundColor
          ? "background:" + this.getBoard.style.backgroundColor
          : "background-image:" +
              `url(${require("@/assets/img/" +
                this.getBoard.style.backgroundUrl)})`;
    },
  },
  mounted() {
    if (this.$refs.list) {
      this.$nextTick(() => {
        this.$refs.list.focus();
      });
      this.$nextTick(() => {
        this.$refs.list.blur();
      });
    }
    // this.$refs.boardPage.addEventListener("mousemove", (ev) => {
    //   socketService.emit("mouseMove", {
    //     x: ev.pageX,
    //     y: ev.pageY,
    //     user: this.getUser || "Guest",
    //   });
    // });
  },

  components: { groupList, boardHeader, Container, Draggable },
  directives: {
    dragscroll,
    clickOutside: vClickOutside.directive,
  },
  watch: {
    "$route.params.boardId": {
      async handler() {
        if (this.board._id !== this.$route.params.boardId) {
          await this.$store.dispatch({
            type: "loadAndWatchBoard",
            boardId: this.$route.params.boardId,
          });
          this.board = this.getCurrBoard;
        }
      },
    },
  },
};
</script>