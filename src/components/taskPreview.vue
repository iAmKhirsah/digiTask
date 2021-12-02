<template>
  <div class="task-preview-container" v-if="task">
    <!-- <router-link :to="{ name: 'taskDetails', params: { taskId: task.id } }"> -->
    <div class="task-preview" @click="editTask(task.id)">
      <div class="task-preview-content">{{ task.title }}</div>
    </div>
    <!-- </router-link> -->
  </div>
</template>
<script>
export default {
  name: "taskPreview",
  props: ["task"],
  methods: {
    editTask(taskId) {
      this.$emit("editTask", taskId);
    },
  },
};
</script>