<template>
  <section>
    <button class="close" @click="closeShowMenu">
      <span class="menu-header-close-button"></span>
    </button>
    <div class="header-back-button" @click="goBack">
      <span class="menu-header-back-button"></span>
    </div>
    <div class="header-layout">
      <header>Change background</header>
    </div>
    <section class="board-background-container">
      <div class="board-background-selection" v-if="!type">
        <div class="board-background-tile" @click="openSection('photos')">
          <div class="board-background-image"></div>
          <div class="title">Photos</div>
        </div>
        <div class="board-background-tile" @click="openSection('colors')">
          <div class="board-background-image"></div>
          <div class="title">Colors</div>
        </div>
      </div>
      <div class="board-background-selection-colors" v-if="type === 'colors'">
        <div
          v-for="(color, idx) in colors"
          :key="idx"
          class="board-background-tile"
        >
          <div
            :style="'background:' + color"
            @click="setBackground(color, 'color')"
            class="board-background-image"
          ></div>
        </div>
      </div>
      <div class="board-background-selection-photos" v-if="type === 'photos'">
        <div v-for="(photo, idx) in photos" :key="idx">
          <div @click="setBackground(photo, 'photo')">
            <img :src="photo.url" :title="photo.by" />
          </div>
        </div>
      </div>
    </section>
  </section>
</template>
<script>
export default {
  props: ["board"],
  data() {
    return {
      updatedBoard: JSON.parse(JSON.stringify(this.board)),
      type: "",
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
      photos: [{}],
    };
  },
  methods: {
    openSection(type) {
      this.type = type;
    },
    goBack() {
      if (this.type) {
        this.type = "";
      } else this.$emit("goBack");
    },
    closeShowMenu() {
      this.$emit("closeShowMenu");
    },
    setBackground(background, type) {
      if (type === "color") {
        this.updatedBoard.style.backgroundColor = background;
        this.updatedBoard.style.backgroundUrl = "";
      } else if (type === "photo") {
        this.updatedBoard.style.backgroundUrl = background;
        this.updatedBoard.style.backgroundColor = "";
      }
      /// BENY REALLY WANTS REGEX HERE SO REMIND HIM CONSTANTLY
      this.$emit("updateBoard", JSON.parse(JSON.stringify(this.updatedBoard)));
    },
  },
  computed: {
    menuHeader() {
      // return this.type === 'color' ? 'Colors' || this.type  === 'photos' ? 'Photos by Unsplash' || this.type ? 'Change background'
    },
  },
};
</script>