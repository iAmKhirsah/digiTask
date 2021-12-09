<template>
  <div class="create-board-menu" v-click-outside="closeCreateMenu">
    <div class="create-board-card">
      <button class="close" @click="closeCreateMenu">
        <span class="menu-header-close-button"></span>
      </button>
      <div class="header-layout">
        <header>Create board</header>
      </div>
    </div>

    <div class="image-container">
      <div class="image-content" :style="'background:' + board.background">
        <img
          src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg"
        />
      </div>
    </div>

    <span class="board-subtitle">Background</span>

    <ul class="bg-menu-selector">
      <div
        class="bg-menu-color"
        v-for="(background, idx) in backgrounds"
        :key="idx"
      >
        <button
          class="color-btn"
          :style="'background:' + background"
          @click="setBackground(background)"
        ></button>
      </div>
    </ul>
    <span class="board-subtitle"
      >Board title<span class="asterisk">*</span></span
    >
    <input type="text" v-model="board.title" />
    <button @click="createBoard" class="create-btn">Create board</button>
  </div>
</template>
   
<script>
import vClickOutside from "v-click-outside";
export default {
  name: "boardCreate",
  data() {
    return {
      board: {
        title: "",
        background: "",
        imgUrl: "",
      },
      backgrounds: [
        "rgb(0, 121, 191)",
        "rgb(210, 144, 52)",
        "rgb(81, 152, 57)",
        "rgb(176, 70, 50)",
      ],
    };
  },
  methods: {
    closeCreateMenu() {
      this.$emit("closeCreateMenu");
    },
    setBackground(background) {
      this.board.background = background;
    },
 createBoard() {
      this.board.title.match(/^\s*$/);
      
      this.$emit("createBoard", this.board);
      this.board = {
        title: "",
        background: "",
        imgUrl: "",
      };
    },
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
};
</script>