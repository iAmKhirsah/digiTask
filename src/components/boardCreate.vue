<template>
  <div class="create-board-menu" v-click-outside="closeCreateMenu">
    <div class="create-board-card" :style="'background:' + board.background">
      <button @click="closeCreateMenu">X</button>
      <input type="text" v-model="board.title" />
    </div>
    <ul class="bg-menu-selector">
      <div
        class="bg-menu-color"
        v-for="(background, idx) in backgrounds"
        :key="idx"
      >
        <button
          :style="'background:' + background"
          @click="setBackground(background)"
        ></button>
      </div>
    </ul>
    <button @click="createBoard">Create board</button>
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
        imgUrl: '',
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
      this.$emit("createBoard", this.board);
      this.board = {
        title: "",
        background: "",
        imgUrl: '',
      };
    },
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
};
</script>