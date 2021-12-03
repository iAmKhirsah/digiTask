<template>
  <div class="task-list-container">
    <div class="task-list-container-content thin-scrollbar">
      <div class="task-list-content" v-for="task in group.tasks" :key="task.id">
        <task-preview :task="task" @editTask="editTask" />
      </div>
    </div>
    <add-task @addTask="addTask"  :isNewTask="isNewTask" v-if="!isNewTask"  />
  </div>
</template>
<script>
import taskPreview from "./taskPreview.vue";
import addTask from "./addTask.vue"
export default {
  name: "taskList",
  props: ["group","isNewTask"],
  components: { taskPreview,addTask },
  data() {
    return {
    
    };
  },
  methods: {
    editTask(taskId) {
      this.$emit("editTask", taskId, this.group.id);
    },
    addTask(newTask) {
      this.$emit("addTask", newTask, this.group.id);

      
    },
 
  },
  
  
};
</script>