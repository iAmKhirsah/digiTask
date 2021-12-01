<template>
  <div v-if="task">
    <div class="task-preview">
      <p>{{ task.title }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "taskPreview",
  props: ["task"],
};
</script>