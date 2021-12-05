<template>
  <section>
    <div>
      <h3>About this board</h3>
      <p>Add a description to your board</p>
    </div>
    <div>
      <h3>Change background</h3>
      <background :board="board" @updateBoard="updateBoard" />
    </div>
    <div>
      <h3>Labels</h3>
    </div>
    <div>
      <h3>Close board...</h3>
    </div>
    <div>
      <h3>Activity</h3>
    </div>
  </section>
</template>
<script>
import background from "../components/background.vue";
export default {
  props: ["board"],
  data() {
    return {};
  },
  methods: {
    updateBoard(board) {},
  },
  components: {
    background,
  },
};
</script>