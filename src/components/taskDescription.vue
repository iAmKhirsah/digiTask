<template>
  <div class="task-description">
    <div class="task-description-title">Description</div>
    <form @submit.prevent="saveDesc">
      <textarea
        v-model="updatedTask.description"
        @click="openButtons = true"
      ></textarea>
      <div v-if="openButtons" class="task-description-buttons">
        <button class="task-description-save">Save</button>
        <button @click="clearDesc" class="task-description-close">X</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  props: ["task"],
  name: "taskDescription",
  data() {
    return {
      updatedTask: "",
      openButtons: false,
    };
  },
  created() {
    this.updatedTask = { ...this.task };
  },
  methods: {
    saveDesc() {
      this.$emit("updatedTask", { ...this.updatedTask });
      this.openButtons = false;
    },
    clearDesc() {
      this.updatedTask = { ...this.task };
      this.openButtons = false;
    },
  },
};
</script>