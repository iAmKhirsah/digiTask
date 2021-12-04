<template>
  <div class="dynamic-group-edit card-layout nav-modal">
    <button @click="closeModal"><i class="fas fa-times"></i></button>
      <div class="header-layout">
      <header>List ations</header>
    </div>
  
    <div>
      <p @click="openNewTask">Add card...</p>
      <p @click="openCopyGroup">Copy list...</p>
        <div class="card-line"></div>
        <p>Sort by...</p>
          <div class="card-line"></div>
          <p @click="openDelete">Delete...</p>

  </div>
  <archive @deleteTask="deleteGroup" @closeModal="closeModal" :isGroup="true" v-if="type==='openDelete'"/>
  </div>
</template>
<script>
import addTask from "../addTask.vue"
import archive from "./archive.vue"

export default {
  name: "group-edit",
  data(){
      return {
          type:''
      }
  },

  methods:{
     closeModal(){
         this.$emit('closeModal')
     },
     openNewTask(){
         this.$emit('openNewTask')
         this.closeModal()
     },
     closeNewTask(){
         this.$emit('closeNewTask')
     },
     openCopyGroup(){
         this.type='copyGroup'
     },
     openDelete(){
         this.type = 'openDelete'
     },
      deleteGroup(task) {
      this.$emit("deleteGroup", task);
    },
  },
  components:{
      addTask,
      archive
  
  }
};
</script>