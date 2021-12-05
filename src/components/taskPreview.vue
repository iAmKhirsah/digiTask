<template>
  <div class="task-preview-container" v-if="task" @click="editTask(task.id)">
    <task-preview-label :task="task" :board="board"/>
    <div class="task-preview" >
      <div class="task-preview-content">{{ task.title }}</div>
    </div>
    
  </div>
</template>
<script>
import taskPreviewLabel from './taskPreviewLabel.vue';

export default {
  components: { taskPreviewLabel },
  name: "taskPreview",
  props: ["task","board"],
  methods: {
    editTask(taskId) {
      this.$emit("editTask", taskId);
    },
    
  },
  components:{
      taskPreviewLabel
    }
};
</script>