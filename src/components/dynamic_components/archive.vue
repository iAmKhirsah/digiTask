<template>
  <div class="dynamic-cover-edit card-layout nav-modal">
    <div class="header-layout">
      <header>Delete card?</header>
    </div>
    <p>
      All actions will be removed from the activity feed and you won’t be able
      to re-open the card. There is no undo.
    </p>
    <button @click="deleteTask">Delete</button>
  </div>
</template>
<script>
export default {
  name: "archive",
  methods: {
    deleteTask() {
      this.$emit("deleteTask");
    },
  },
};
</script>