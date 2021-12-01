<template>
  <div class="task-list-container">
    <div v-for="task in tasks" :key="task.id">
      <task-preview :task="task" />
    </div>
  </div>
</template>
<script>
import taskPreview from "./taskPreview.vue";
export default {
  name: "taskList",
  props: ["tasks"],
  components: { taskPreview },
};
</script>