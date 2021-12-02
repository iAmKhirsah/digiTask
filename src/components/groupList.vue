<template>
  <div class="group-list-container">
    <div v-for="group in boardGroups" :key="group.id" class="group-list-group">
      <div>
        <p>{{ group.title }}</p>
        <button>edit</button>
      </div>
      <task-list :group="group" @editTask="editTask" @addTask="addTask" />
     
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
    editTask(taskId,groupId) {
      
      let boardId = this.$route.params.boardId;
      let routerLink = `${boardId}/g/${groupId}/t/${taskId}`;
      this.$router.push(routerLink);
    },
    addTask(groupId){
      
    }
  },
};
</script>