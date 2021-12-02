<template>
  <section class="dynamic-starred">
    <!-- <button @click="closeModal"><i class="fas fa-times"></i></button> -->
    <div v-for="(board, idx) in starredBoards" :key="idx">
      {{ board }}
    </div>
  </section>
</template>
<script>
export default {
  name: "starred",
  data() {
    return {
      starredBoards: null,
    };
  },
  methods: {
    closeModal() {
      console.log("hello");
      this.$emit("closeModal");
    },
  },
};
</script>