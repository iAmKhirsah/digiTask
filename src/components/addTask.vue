 
<template>
<<<<<<< HEAD
  <div class="add-task" v-click-outside="closeNewTask">
    <div v-if="openNewTask">
      <form class="add-task-form" @submit.prevent="addTask">
        <input ref="task"  type="text" v-model="newTask" />
        <button class="add-task-btn" type="submit">Add</button>
        <button class="add-task-close-btn" type="button" @click="closeNewTask">
          <i class="fas fa-times"></i>
        </button>
=======
  <div class="add-task"  v-click-outside="closeNewTask"  >
      <div v-if="openNewTask">
      <form class="add-task-form" @submit.prevent="addTask" >
         <textarea
          ref="task"
        
          oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
          onfocus='this.style.height = "";this.style.height = this.scrollHeight + "px"'
          v-model="newTask"
          maxlength="512"
         
        />
               
                <button type="submit">Add</button>

>>>>>>> 45142d7230cc605966b926f4f285165941f2467a
      </form>
    </div>

    <div class="add-task-add-card" v-if="!openNewTask" @click="newTaskOn">
      <span class="group-add-plus"><i class="fas fa-plus"></i></span
      ><span>Add a card</span>
    </div>
  </div>
</template>
<script>
import vClickOutside from "v-click-outside";
export default {
  name: "addTask",
  props: ["isGroup"],
  created() {},
  data() {
    return {
      newTask: "",
      openNewTask: false,
    };
  },
  methods: {
    addTask() {
      this.$emit("addTask", this.newTask);
      this.newTask = "";
    },
    closeNewTask() {
      this.openNewTask = false;
      this.newTask = "";
      this.$emit("closeNewTask");
    },
    newTaskOn() {
      this.$emit("openNewTask");
      this.openNewTask = true;
      this.$nextTick(() => {
        this.$refs.task.focus();
      });
    },
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
};
</script>
