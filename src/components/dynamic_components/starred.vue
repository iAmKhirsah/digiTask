<template>
  <section class="dynamic-starred">
    <button @click="closeModal"> <span class="icon-lg close-icon">  </span></button>
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
     
      this.$emit("closeModal");
    },
  },
};
</script>