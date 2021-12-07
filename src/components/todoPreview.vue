<template>
  <section>
    <span><input class="box-input" type="checkbox" /></span>
    <!-- render vfor todo -->
    <span class="task-todo-minus-btn minus"> </span>
    <span v-if="!todoEdit" @click="openEditTodo">{{ todo.title }}</span>

    <form v-else class="todos-form">
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
export default {
  props: ["todo", "checklist"],
  name: "todoList",
  data() {
    return {
      todoEdit: false,
      currTodo: {},
    };
  },
  methods: {
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
      let checklist = JSON.parse(JSON.stringify(this.checklist));

      let idx = checklist.todos.findIndex((todo) => {
        return this.todo.id === todo.id;
      });

      checklist.todos[idx].title = this.currTodo.title;
      checklist.todos[idx].isDone = this.currTodo.isDone;

      this.$emit("updatedChecklist", checklist);

      this.todoEdit = false;
    },
  },
};
</script>
