<template>
  <div>
    <button><i class="fas fa-times"></i></button>
    <p>Add Checklist</p>
    <p>Title</p>
    <form @submit.prevent="addChecklist">
      <input type="text" />
    </form>
  </div>
</template>
<script>
export default {
  name: "labels",
};
</script>