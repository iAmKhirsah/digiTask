<template>
  <div class="task-list-container">
    <div v-for="task in group.tasks" :key="task.id">
      <task-preview :task="task" @editTask="editTask" />
    </div> 
      <div class="add-task" @click="addTask"><span class="group-add-plus"><i class="fas fa-plus"></i></span><span>Add a card</span></div>
  </div>
</template>
<script>
import taskPreview from "./taskPreview.vue";
export default {
  name: "taskList",
  props: ["group"],
  components: { taskPreview },
  methods: {
    editTask(taskId) {
      this.$emit("editTask", taskId,this.group.id);
    },
    addTask(){
      this.$emit("addTask",this.group.id)
    }
  },
};
</script>