<template>
  <div class="group-list-container">
    <div v-for="group in boardGroups" :key="group.id" class="group-list-group">
<<<<<<< HEAD
      <div>
        <textarea v-model="group.title" class="group-title" @change="updateGroup"/>
        <!-- <span class="input" role="textbox"  contenteditable @change="updateGroup">{{group.title}}</span> -->
=======
     <!-- beny -->
      <div class="group-header">
       
   

        
        <div v-if="editingGroup.id!==group.id" @click="groupTitle(group)">{{group.title}}</div>
        <input :ref="'title_'+group.id" v-else v-model="editingGroup.title" @change="updateGroup" @blur="disableTitleEdit"/>

        <!-- <textarea v-model="group.title" class="group-title" @change="updateGroup"/> -->
        <!-- <span class="input" role="textbox"  contenteditable @change="updateGroup">{{group.title}}</span> -->

>>>>>>> 0eafb460d0f8c8c8fa3ac7b977f72e778dcb01fd
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
    return {
      editingGroup:{},
      isEditing:false
    };
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
    updateGroup(group){
      console.log('group title changed')
      this.$emit("updateGroup",{...group})
    },
    disableTitleEdit(){
      this.isEditing = false
      this.editingGroup = {}
      
    },
    groupTitle(group){
      this.isEditing = true
      this.editingGroup = {...group}
        this.$nextTick(() => {
       this.$refs["title_" + group.id][0].focus()
      });
        
     
    }
  },
  computed:{
    
  }
};
</script>