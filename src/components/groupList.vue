<template>
  <div class="group-list-container">
    <div v-for="group in boardGroups" :key="group.id" class="group-list-group">
      <p>{{ group.title }}</p>
      <task-list :tasks="group.tasks" />
    </div>
  </div>
</template>
<script>
import taskList from "./taskList.vue";

export default {
  name: "groupList",
  props: ["boardGroups"],
  components: { taskList },
};
</script>