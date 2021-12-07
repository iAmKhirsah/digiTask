<template>
  <section>
    <span
      ><input
        class="box-input"
        type="checkbox"
        @click="toggleCheck"
        v-model="isChecked"
        :class="{ checked: isChecked }"
    /></span>
    <!-- render vfor todo -->
    <span class="task-todo-minus-btn minus"> </span>
    <span
      class="todoTitle"
      v-if="!todoEdit"
      @click="openEditTodo"
      :class="{ clear: isChecked }"
      >{{ todoTitle }}</span
    >

    <form v-else class="todos-form" v-click-outside="closeEditTodo">
      <textarea
        ref="subtitle"
        v-model="currTodo.title"
        class="textarea-another-list"
      ></textarea>
      <div class="task-checklist-btns">
        <button type="submit" class="task-checklist-save" @click="saveTodo">
          Save
        </button>
        <button class="task-checklist-close">
          <span class="material-icons" @click="closeEditTodo"> clear </span>
        </button>
      </div>
    </form>
  </section>
</template>
<script>
import vClickOutside from "v-click-outside";
export default {
  props: ["todo", "checklist"],
  name: "todoList",
  data() {
    return {
      todoEdit: false,
      currTodo: {},
      isChecked: false,
    };
  },
  created() {
    this.currTodo = JSON.parse(JSON.stringify(this.todo));
    this.isChecked = this.currTodo.isDone;
    console.log(this.currTodo)
  },
  methods: {
    toggleCheck() {
      this.isChecked = !this.isChecked;
      this.currTodo.isDone = this.isChecked;
      this.saveTodo();
    },
    openEditTodo() {
      this.currTodo = JSON.parse(JSON.stringify(this.todo));
      this.todoEdit = true;
      this.$nextTick(() => {
        this.$refs.subtitle.focus();
        this.$refs.subtitle.select();
      });
    },
    closeEditTodo() {
      this.todoEdit = false;
    },
    saveTodo() {
      if (this.currTodo.title.match(/^\s*$/)) return;
      console.log('hello')
      let checklist = JSON.parse(JSON.stringify(this.checklist));
      let idx = checklist.todos.findIndex((todo) => {
        return this.currTodo.id === todo.id;
      });
      checklist.todos[idx].title = this.currTodo.title;
      checklist.todos[idx].isDone = this.currTodo.isDone;
     
      console.log(checklist)
      this.$emit("updatedChecklist", checklist);


      this.todoEdit = false;
    },
  },
  computed: {
    todoTitle() {
      return this.todo.title;
    },
  },
    directives: {

    clickOutside: vClickOutside.directive,
  },
};
</script>
