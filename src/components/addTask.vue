 
<template>
  <div class="add-task" v-click-outside="closeNewTask">
    <div v-if="openNewTask">
      <form class="add-task-form" v-on:keydown.enter="addTask">
        <textarea
          class="textarea"
          ref="task"
          oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
          onfocus='this.style.height = "";this.style.height = this.scrollHeight + "px"'
          v-model="newTask"
          @keydown.enter.prevent
          maxlength="512"
        />
        <div class="add-task-form-btns">
          <button class="add-task-btn" @click="addTask">Add card</button>
          <button
            class="add-task-close-btn"
            type="button"
            @click="closeNewTask"
          >
            
            <span class="material-icons"> clear </span>
          </button>
        </div>
      </form>
    </div>

    <div class="add-task-add-card" v-if="!openNewTask" @click="newTaskOn">
      <span class="group-add-plus">
        <span class="material-icons"> add </span> </span
      ><span class="title">Add a card</span>
    </div>
  </div>
</template>
<script>
import vClickOutside from "v-click-outside";
export default {
  name: "addTask",
  props: {
    inGroup: {
      type: Boolean,
      default: false,
    },
  },

  created() {
    if (this.inGroup) {
      this.openNewTask = true;
      this.$nextTick(() => {
        this.$refs.task.focus();
      });
    }
  },
  data() {
    return {
      newTask: "",
      openNewTask: false,
    };
  },
  methods: {
    addTask() {
      if (!this.newTask.length || this.newTask.match(/^\s*$/)) {
        this.$nextTick(() => {
          this.$refs.task.focus();
        });
        return;
      }
      this.$emit("addTask", this.newTask);
      this.newTask = "";
      this.$nextTick(() => {
        this.$refs.task.focus();
      });
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
