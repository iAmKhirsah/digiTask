<template>
  <div class="task-list-container">
    <div class="task-list-container-content thin-scrollbar">
      <div class="task-list-content" v-for="task in group.tasks" :key="task.id">
        <task-preview :task="task" @editTask="editTask" />
      </div>
    </div>
    <div class="add-task" v-click-outside="closeNewTask" >
      <div v-if="openNewTask">
      <form class="add-task-form" @submit.prevent="addTask" >
        <input type="text" v-model="newTask" />
               
                <button type="submit">Add</button>

      </form>
       <button @click="closeNewTask"><i class="fas fa-times"></i></button>
      </div>
      
      <div class="add-task-add-card" v-if="!openNewTask" @click="openNewTask= true">
        <span class="group-add-plus"><i class="fas fa-plus"></i></span
        ><span>Add a card</span>
      </div>
    </div>
  </div>
</template>
<script>
import taskPreview from "./taskPreview.vue";
import vClickOutside from "v-click-outside";
export default {
  name: "taskList",
  props: ["group"],
  components: { taskPreview },
  data() {
    return {
      newTask: "",
      openNewTask: false,
    };
  },
  methods: {
    editTask(taskId) {
      this.$emit("editTask", taskId, this.group.id);
    },
    addTask() {
      this.$emit("addTask", this.newTask, this.group.id);
     this.newTask = ""
      
    },
    closeNewTask(){
        this.newTask = ""
      this.openNewTask = false;
    }
  },
    directives: {
    clickOutside: vClickOutside.directive,
  },
  
};
</script>