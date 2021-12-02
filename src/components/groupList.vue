<template>
  <div class="group-list-container">
    <div v-for="group in boardGroups" :key="group.id" class="group-list-group">
<<<<<<< HEAD
     <!-- beny -->
      <div class="group-header">
        <p>{{ group.title }}</p>
=======
      <div>
        <textarea
          v-model="group.title"
          class="group-title"
          @change="updateGroup"
        />
        <!-- <span class="input" role="textbox"  contenteditable @change="updateGroup">{{group.title}}</span> -->
>>>>>>> 283302f8ca538f12e86d77ce450f013d3a797bbf
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
    editTask(taskId, groupId) {
      let boardId = this.$route.params.boardId;
      let routerLink = `${boardId}/g/${groupId}/t/${taskId}`;
      this.$router.push(routerLink);
    },
    addTask(task, groupId) {
      this.$emit("addTask", task, groupId);
    },
    updateGroup(group) {
      console.log("group title changed");
      this.$emit("updateGroup", group);
    },
  },
};
</script>