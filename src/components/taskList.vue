<template>
  <div class="task-list-container">
    <div class="task-list-content" v-for="task in group.tasks" :key="task.id">
      <task-preview :task="task" @editTask="editTask" />
    </div>
    <div class="add-task" @click="openNewTask = true">
      <form @submit.prevent="addTask" v-if="openNewTask">
        <input type="text" v-model="newTask" />
        <button>Add card</button>
      </form>
      <div v-if="!openNewTask">
        <span class="group-add-plus"><i class="fas fa-plus"></i></span
        ><span>Add a card</span>
      </div>
    </div>
  </div>
</template>
<script>
import taskPreview from "./taskPreview.vue";
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
      this.newTask = "";
      this.openNewTask = false;
    },
  },
};
</script>