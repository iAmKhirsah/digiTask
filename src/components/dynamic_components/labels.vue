<template>
  <div>
    <button><i class="fas fa-times"></i></button>
    <p>Labels</p>
    <input type="text" placeholder="Search labels..." />
    <ul v-for="label in labels" :key="label.id">
      <li>{{ label }} <span>Edit</span></li>
    </ul>
    <button>Create a new label</button>
  </div>
</template>
<script>
export default {
  name: "labels",
};
</script>