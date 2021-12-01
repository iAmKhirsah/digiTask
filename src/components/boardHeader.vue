<template>
  <header class="board-header">
    <div class="board-box">
      <input :style="inputWidth" v-model="board.title" />
    </div>
    <div class="board-box star" @click="toggleStar">
      <span v-if="!isStarred"><i class="far fa-star"></i></span>
      <span v-else><i class="fas fa-star"></i></span>
    </div>
  </header>
</template>
<script>
export default {
  name: "boardHeader",
  props: ["board"],
  data() {
    return {
      isStarred: false,
    };
  },
  created() {},
  computed: {
    inputWidth() {
      return { width: this.board.title.length * 10 + 24 + "px" };
    },
  },
  methods:{
    toggleStar(){
      this.isStarred = !this.isStarred
    }
  }
};
</script>