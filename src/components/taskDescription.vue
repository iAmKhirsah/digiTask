<template>
  <div>
    <p>Description</p>
    <form @submit.prevent="saveDesc">
      <textarea v-model="updatedTask.description"></textarea>
      <button>Save</button>
      <button @click="clearDesc">X</button>
    </form>
  </div>
</template>
<script>
export default {
  props: ["task"],
  name: "taskDescription",
  data() {
    return {
      updatedTask: "",
    };
  },
  created() {
    this.updatedTask = { ...this.task };
  },
  methods: {
    saveDesc() {
      this.$emit("updatedTask", {...this.updatedTask});
    },
    clearDesc() {
      this.updatedTask = { ...this.task };
    },
  },
};
</script>