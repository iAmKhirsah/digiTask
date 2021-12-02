<template>
  <div class="group-list-container">
    <div v-for="group in boardGroups" :key="group.id" class="group-list-group">
      <div>
        <textarea v-model="group.title" class="group-title" @change="updateGroup"/>
        <!-- <span class="input" role="textbox"  contenteditable @change="updateGroup">{{group.title}}</span> -->
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
      this.$emit("addTask",groupId)
    },
    updateGroup(group){
      console.log('group title changed')
      this.$emit("updateGroup",group)
    }
  },
};
</script>