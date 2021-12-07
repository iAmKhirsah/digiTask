<template>
  <div class="task-checklist">
    <!-- v-if -->
    <div v-if="!isEditing" class="checklist-title">
      <p class="task-checklist-placeholder" @click="editTitle">
        {{ checklistTitle }}
      </p>
      <button class="open-edit-dynamic-btn remove">delete</button>
    </div>
    <div v-else class="task-checklist-content" v-click-outside="closeChecklist">
      <form>
        <textarea
          ref="title"
          class="textarea-another-list"
          maxlength="512"
          placeholder="Checklist"
          v-model="currChecklist.title"
        />
        <div class="task-checklist-btns">
          <button
            type="submit"
            class="task-checklist-save"
            @click="saveChecklist(currChecklist)"
          >
            Save
          </button>
          <button class="task-checklist-close">
            <span @click="closeChecklist" class="material-icons"> clear </span>
          </button>
        </div>
      </form>
    </div>

    <div class="checklist-progress">
      <!-- progress bar -->
      <span class="checklist-progress-percentage">{{ getPercentage }}</span>
      <div class="checklist-progress-bar">
        <div
          :class="['progress-bar', completedBar]"
          :style="'width :' + getPercentage"
        ></div>
      </div>
    </div>

    <div v-if="isChecklistTodos">
      <!-- vfor todos-->
      <div
        v-for="todo in checklistTodos"
        :key="todo.id"
        class="checklist-todos"
      >
        <todo-preview
          class="todo-preview-container"
          :checklist="checklist"
          :todo="todo"
          @updatedChecklist="saveChecklist"
        ></todo-preview>
      </div>
    </div>

    <!-- v-if -->
    <div v-if="!isAddTodo" class="task-checklist-btns">
      <button @click="openAddTodo" class="open-edit-dynamic-btn">
        Add an item
      </button>
    </div>

    <!-- v-else -->
    <div v-else v-click-outside="closeAddTodo">
      <form>
        <textarea
          class="textarea-another-list"
          maxlength="512"
          placeholder="Add an item"
          v-model="newTask.title"
        />
        <div class="task-checklist-btns">
          <button @click="addTodo" type="submit" class="task-checklist-save">
            Add
          </button>
          <button class="task-checklist-close">
            <span @click="closeAddTodo" class="material-icons"> clear </span>
          </button>
        </div>
      </form>
    </div>
    <!-- v-else -->
  </div>
</template>
<script>
import vClickOutside from "v-click-outside";
import todoPreview from "../components/todoPreview.vue";
import { utilService } from "../services/utilService.js";
export default {
  props: ["currTask", "checklist"],
  name: "taskChecklist",
  data() {
    return {
      isAddTodo: false,
      isEditing: false,
      currTodo: {},
      currentTask: {},
      currChecklist: {},
      newTask: {
        id: "",
        title: "",
        isDone: false,
      },
    };
  },
  created() {
    this.currentTask = JSON.parse(JSON.stringify(this.currTask));
    this.currChecklist = JSON.parse(JSON.stringify(this.checklist));
  },
  methods: {
    addTodo() {
      if (this.newTask.title.match(/^\s*$/)) return;
      this.currChecklist = this.checklist;
      this.newTask.id = utilService.makeId();
      this.currChecklist.todos.push(this.newTask);
      this.saveChecklist(this.currChecklist);
      this.newTask = { id: "", title: "", isDone: false };
      this.isAddTodo = false;
    },
    openAddTodo() {
      this.isAddTodo = true;
    },
    editTitle() {
      this.isEditing = true;
      this.$nextTick(() => {
        this.$refs.title.focus();
        this.$refs.title.select();
      });
    },

    saveChecklist(checklist) {
      if (this.checklist.title.match(/^\s*$/)) return;
      this.isEditing = false;

      let idx = this.currentTask.checklists.findIndex((currChecklist) => {
        return this.currChecklist.id === currChecklist.id;
      });

      this.currentTask.checklists[idx] = checklist;

      this.$emit("updatedTask", this.currentTask);
    },

    closeAddTodo() {
      this.isAddTodo = false;
    },

    closeChecklist() {
      this.isEditing = false;
      this.currChecklist = JSON.parse(JSON.stringify(this.checklist));
    },
  },
  computed: {
    checklistTitle() {
      return this.currChecklist.title;
    },
    isChecklistTodos() {
      return this.currChecklist.todos && this.currChecklist.todos.length;
    },
    checklistTodos() {
      return this.checklist.todos;
    },
    getPercentage() {
      let isDones = this.checklist.todos.reduce((acc, todo) => {
        if (todo.isDone) acc++;
        return acc;
      }, 0);
      if (!isDones) return "0% ";
      return ((isDones * 100) / this.checklist.todos.length).toFixed(0) + "%";
    },
    completedBar() {
      if (this.getPercentage === "100%") {
        return "complete";
      }
    },
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: {
    todoPreview,
  },
};
</script>