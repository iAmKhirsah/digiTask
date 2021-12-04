<template>
  <div class="task-preview-container" v-if="task" @click="editTask(task.id)">
    <!-- <router-link :to="{ name: 'taskDetails', params: { taskId: task.id } }"> -->
    <div class="task-preview" >
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