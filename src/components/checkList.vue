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
            @click="saveChecklist"
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

      <span class="checklist-progress-percentage">33%</span>
      <div class="checklist-progress-bar">
        <div></div>
      </div>
      <span></span>
    </div>

    <div v-if="checklistTodos">
      <!-- vfor todos-->
      <div
        v-for="todo in checklist.todos"
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
    <div v-if="!addTodo" class="task-checklist-btns">
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
          <button @click="saveTodo" type="submit" class="task-checklist-save">
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
export default {
  props: ["currTask", "checklist"],
  name: "taskChecklist",
  data() {
    return {
      addTodo: false,
      isEditing: false,
      currTodo: {},
      currentTask: {},
      currChecklist: {},
      newTask: {
        title: "",
      },
    };
  },
  created() {
    this.currentTask = JSON.parse(JSON.stringify(this.currTask));
    this.currChecklist = JSON.parse(JSON.stringify(this.checklist));
  },
  methods: {
    saveTodo() {
      if (this.newTask.title.match(/^\s*$/)) {
        this.addTodo = false;
        return;
      }
      console.log(this.newTask);

      this.addTodo = false;
    },
    openAddTodo() {
      this.addTodo = true;
    },
    editTitle() {
      this.isEditing = true;
      this.$nextTick(() => {
        this.$refs.title.focus();
        this.$refs.title.select();
      });
    },

    saveChecklist(checklist = this.currChecklist) {
      if (this.checklist.title.match(/^\s*$/)) return;
      this.isEditing = false;

      //   this.checklist.title = this.checklistTitle
      let idx = this.currentTask.checklists.findIndex((currChecklist) => {
        return this.checklist.id === currChecklist.id;
      });

      this.currentTask.checklists[idx] = checklist;

      this.$emit("updatedTask", this.currentTask);
    },

    closeAddTodo() {
      this.addTodo = false;
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
    checklistTodos() {
      return this.currChecklist.todos && this.currChecklist.todos.length;
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