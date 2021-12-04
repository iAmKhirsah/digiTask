<template>
  <div class="dynamic-checklist-edit">
    <button class="close" @click="closeModal"><i class="fas fa-times"></i></button>
    <div class="header-layout">
      <header>Add checklist</header>
    </div>
    <p class="title">Title</p>
    <form @submit.prevent="addChecklist">
      <input type="text" />
    <button class="add">Add</button>
    </form>
  </div>
</template>
<script>
export default {
  name: "checklist",
  methods:{
      closeModal() {
     
      this.$emit("closeModal");
    },
  }
};
</script>