<template>
  <div class="dynamic-labels-edit">
    <button class="close" @click="closeModal"><i class="fas fa-times"></i></button>
    <div class="header-layout">
      <header>Labels</header>
    </div>
    <input type="text" placeholder="Search labels..." />
    <ul v-for="label in board.labels" :key="label.id">
      <li :style="'background-color:' + label.color" @click="addLabel(label)">
        {{ label.title }} <span>Edit BUTTON GOES HERE</span>
      </li>
    </ul>
    <button class="create">Create a new label</button>
  </div>
</template>
<script>
export default {
  name: "labels",
  props: ["board"],
  computed: {},
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    addLabel(label) {
      this.$emit("addLabel", label);
    },
  },
};
</script>