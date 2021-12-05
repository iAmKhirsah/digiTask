<template>
  <div class="dynamic-archive-edit">
    <button class="close" @click="closeModal">
       <span class="material-icons"> clear </span>
    </button>
    <div class="header-layout">
      <header>
        Delete <span>{{ whichDelete }}</span>
      </header>
    </div>
    <div class="main-container">
      <p>
        All actions will be removed from the activity feed and you won’t be able
        to re-open the card. There is no undo.
      </p>
      <button @click="deleteThis">Delete</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "archive",
  props: {
    isGroup: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    deleteThis() {
      this.isGroup ? this.$emit("deleteGroup") : this.$emit("deleteTask");
      this.closeModal();
    },
    closeModal() {
      this.$emit("closeModal");
    },
  },
  computed: {
    whichDelete() {
      return this.isGroup ? "list" : "card";
    },
  },
};
</script>