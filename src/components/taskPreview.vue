<template>
  <div v-if="task">
    <!-- <router-link :to="{ name: 'taskDetails', params: { taskId: task.id } }"> -->
    <div class="task-preview" @click="editTask(task.id)">
      <p>{{ task.title }}</p>
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