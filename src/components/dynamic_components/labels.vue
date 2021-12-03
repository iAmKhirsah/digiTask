<template>
  <div class="dynamic-labels-edit card-layout nav-modal">
    <button><i class="fas fa-times"></i></button>
    <div class="header-layout">
      <header>Labels</header>
    </div>
    <input type="text" placeholder="Search labels..." />
    <ul v-for="label in board.labels" :key="label.id">
      <li :style="'background-color:' + label.color">
        {{ label.title }} <span>Edit BUTTON GOES HERE</span>
      </li>
    </ul>
    <button>Create a new label</button>
  </div>
</template>
<script>
export default {
  name: "labels",
  props: ["board"],
  computed: {},
};
</script>