<template>
  <div class="create-board-menu" v-click-outside="closeModal">
    <div class="create-board-card">
      <button class="close" @click="closeModal">
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
       <!-- <div class="board-background-selection-photos" >
        <span v-for="(photo, idx) in photos" :key="idx">
          <span class="img-content" @click="setBackground(photo, 'photo')">
            <img :src="require(`@/assets/img/${photo}`)" :title="photo.by" />
          </span>
        </span>
      </div> -->
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
       photos: [
        "background-1.jpg",
        "background-2.jpg",
        "background-3.jpg",
        "background-4.jpg",
        "background-5.jpg",
        "background-6.jpg",
      ],
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
      this.$emit("closeCreateMenu")
    },
    setBackground(background) {
      this.board.background = background;
    },
 createBoard() {
      if(this.board.title.match(/^\s*$/)) return
      this.$emit("createBoard", this.board);
      this.board = {
        title: "",
        background: "",
        imgUrl: "",
      }; 
      this.closeModal()
    },
   
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
};
</script>