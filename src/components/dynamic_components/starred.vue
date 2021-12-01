<template>
  <section class="dynamic-starred">
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
};
</script>