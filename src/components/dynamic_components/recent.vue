<template>
  <section class="dynamic-recent">
    <div v-for="(board, idx) in recentBoards" :key="idx">
      {{ board }}
    </div>
  </section>
</template>
<script>
export default {
  name: "recent",
  data() {
    return {
      recentBoards: null,
    };
  },
};
</script>