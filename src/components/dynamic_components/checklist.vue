<template>
  <div class="dynamic-checklist-edit">
    <button class="close" @click="closeModal">
      <span class="menu-header-close-button"></span>
    </button>
    <div class="header-layout">
      <header>Add checklist</header>
    </div>
    <p class="subtitle">Title</p>
    <form @submit.prevent="addChecklist">
      <input v-model="newChecklist.title" type="text" />
      <button class="add">Add</button>
    </form>
  </div>
</template>
<script>
import { utilService } from "../../services/utilService.js";
export default {
  props: ["task"],
  name: "checklist",
  data() {
    return {
      taskToUpdate: {},
      newChecklist: {
        id: "c" + utilService.makeId(),
        title: "",
        todos: [],
      },
    };
  },
  created() {
    this.taskToUpdate = JSON.parse(
      JSON.stringify(this.$store.getters.getCurrTask)
    );
  },
  methods: {
    addChecklist() {
      if (this.newChecklist.title.match(/^\s*$/)) return;

      this.taskToUpdate.checklists.push(this.newChecklist);
      this.$emit("updateTask", JSON.parse(JSON.stringify(this.taskToUpdate)));
      this.$emit("taskActivity", "added a new checklist");
      this.newChecklist = {
        id: "c" + utilService.makeId(),
        title: "",
        todos: [],
      };
    },
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>