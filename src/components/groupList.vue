<template>
  <div class="group-list-container">
    <div v-for="group in boardGroups" :key="group.id" class="group-list-group">
      <div>
        <p>{{ group.title }}</p>
        <button>edit</button>
      </div>
      <task-list :tasks="group.tasks" @editTask="editTask" />
    </div>
  </div>
</template>
<script>
import taskList from "./taskList.vue";

export default {
  name: "groupList",
  props: ["boardGroups"],
  components: { taskList },
  data() {
    return {};
  },
  methods: {
    editTask(taskId) {
      let group = this.boardGroups.find((group) => {
        if (group.tasks.find((task) => task.id === taskId));
        return group;
      });
      console.log(group);
      let boardId = this.$route.params.boardId;
      let routerLink = `${boardId}/g/${group.id}/t/${taskId}`;
      this.$router.push(routerLink);
    },
  },
};
</script>