<template>
  <div class="task-preview-container" v-if="task" >
    <task-preview-label :isMiniPreview="isMiniPreview" @miniPreview="miniPreview" :task="task" :board="board"/>
    <div @click="editTask(task.id)" class="task-preview" >
      <div class="task-preview-content">{{ task.title }}</div>
    </div>
    
  </div>
</template>
<script>
import taskPreviewLabel from './taskPreviewLabel.vue';

export default {
  components: { taskPreviewLabel },
  name: "taskPreview",
  props: ["task","board","isMiniPreview"],
  methods: {
    editTask(taskId) {
      this.$emit("editTask", taskId);
    },
    miniPreview(){
      this.$emit("miniPreview")
    }
    
  },
  components:{
      taskPreviewLabel
    }
};
</script>