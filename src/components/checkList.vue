<template>
  <div class="task-checklist">
    <!-- v-if -->
    <div v-if="!isEditing" class="checklist-title">
      <p class="task-checklist-placeholder" @click="editTitle">
        {{ checklistTitle }}
      </p>
      <button class="open-edit-dynamic-btn remove" @click="removeCheckList">
        Delete
      </button>
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
            <span @click="closeChecklist" class="icon-lg close-icon"></span>
          </button>
        </div>
      </form>
    </div>

    <div class="checklist-progress">
      <span class="checklist-progress-percentage">{{ percentageForDisplay }}</span>
      <div class="checklist-progress-bar">
        <div
          :style="'width:' + percentageForDisplay"
          :class="['progress-bar', completedBar]"
        ></div>
      </div>
    </div>

    <div v-if="isChecklistTodos">
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
    <div v-if="!isAddTodo" class="task-checklist-btns">
      <button @click="openAddTodo" class="open-edit-dynamic-btn">
        Add an item
      </button>
    </div>
    <div v-else v-click-outside="closeAddTodo">
      <form>
        <textarea
          class="textarea-another-list"
          maxlength="512"
          placeholder="Add an item"
          v-model="newTodo.title"
        />
        <div class="task-checklist-btns">
          <button @click="addTodo" type="submit" class="task-checklist-save">
            Add
          </button>
          <button class="task-checklist-close">
            <span @click="closeAddTodo" class="icon-lg close-icon"> </span>
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
      newTodo: {
        id: "",
        title: "",
        isDone: false,
      },
    };
  },
  created() {
    this.currentTask = JSON.parse(JSON.stringify(this.currTask));
    this.currChecklist = JSON.parse(JSON.stringify(this.checklist));
    console.log(this.checklist);
  },
  methods: {
    addTodo() {
      if (this.newTodo.title.match(/^\s*$/)) return;

      this.currChecklist = JSON.parse(JSON.stringify(this.checklist));
      this.newTodo.id = utilService.makeId();
      this.currChecklist.todos.push(this.newTodo);
      this.saveChecklist(this.currChecklist);
      this.newTodo = { id: "", title: "", isDone: false };
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
    removeCheckList() {
      let idx = this.currentTask.checklists.findIndex(
        (currChecklist) => currChecklist.id === this.checklist.id
      );
      this.currentTask = JSON.parse(JSON.stringify(this.currTask));
      this.currentTask.checklists.splice(idx, 1);
      this.$emit("updatedTask", this.currentTask);
    },

    saveChecklist(checklist) {
      if (this.checklist.title.match(/^\s*$/)) return;
      this.currentTask = JSON.parse(JSON.stringify(this.currTask));
      this.isEditing = false;
      console.log(this.currentTask.checklists);

      let idx = this.currentTask.checklists.findIndex(
        (currChecklist) => currChecklist.id === checklist.id
      );
      if (idx > -1) this.currentTask.checklists[idx] = checklist;
      else this.currentTask.checklists.push(checklist);
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
    percentageForDisplay() {
      let doneCount = this.checklist.todos.reduce((acc, todo) => {
        if (todo.isDone) acc++;
        return acc;
      }, 0);
      if (!doneCount) return "0%";
      return ((doneCount * 100) / this.checklist.todos.length).toFixed(0) + "%";
    },

    completedBar() {
      if (this.percentageForDisplay === "100%") {
        return "complete";
      }
    },

    checklistTitle() {
      return this.currChecklist.title;
    },
    isChecklistTodos() {
      return this.currChecklist.todos && this.currChecklist.todos.length;
    },
    checklistTodos() {
      return this.checklist.todos;
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