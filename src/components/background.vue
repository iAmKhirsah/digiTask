<template>
  <section>
    <div class="board-background-selection" v-if="!type">
      <div class="board-background-photos" @click="openSection('photos')">
        <p>Photos</p>
      </div>
      <div class="board-background-colors" @click="openSection('colors')">
        <p>Colors</p>
      </div>
    </div>
    <div class="board-background-selection-colors" v-if="type === 'colors'">
      <div v-for="(color, idx) in colors" :key="idx">
        <div
          :style="'background:' + color"
          @click="setBackground(color, 'color')"
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
</template>
<script>
export default {
  props: ["board"],
  data() {
    return {
      board: JSON.parse(JSON.stringify(this.board)),
      type: "",
      colors: [
        "#61bd4f",
        "#f2d600",
        "#ff9f1a",
        "#eb5a46",
        "#c377e0",
        "#0079bf",
        "#00c2e0",
        "#51e898",
        "#ff78cb",
        "#344563",
        "#b3bac5",
      ],
      photos: [{}],
    };
  },
  methods: {
    openSection(type) {
      this.type = type;
    },
    setBackground(background, type) {
      if (type === "color") {
        this.board.style.backgroundColor === background;
        this.board.style.backgroundUrl = "";
      } else if (type === "photo") {
        this.board.style.backgroundUrl === background;
        this.board.style.backgroundColor = "";
      }
      /// BENY REALLY WANTS REGEX HERE SO REMIND HIM CONSTANTLY
      this.$emit("updateBoard", this.board);
    },
  },
};
</script>