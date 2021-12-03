<template>
  <div class="dynamic-checklist-edit card-layout nav-modal">
    <button><i class="fas fa-times"></i></button>
    <div class="header-layout">
      <header>Add checklist</header>
    </div>
    <p>Title</p>
    <form @submit.prevent="addChecklist">
      <input type="text" />
    </form>
  </div>
</template>
<script>
export default {
  name: "checklist",
};
</script>