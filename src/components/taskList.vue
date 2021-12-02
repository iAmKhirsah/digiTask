<template>
  <div class="task-list-container">
    <div v-for="task in tasks" :key="task.id">
      <task-preview :task="task" @editTask="editTask" />
    </div>
  </div>
</template>
<script>
import taskPreview from "./taskPreview.vue";
export default {
  name: "taskList",
  props: ["tasks"],
  components: { taskPreview },
  methods: {
    editTask(taskId) {
      this.$emit("editTask", taskId);
    },
  },
};
</script>