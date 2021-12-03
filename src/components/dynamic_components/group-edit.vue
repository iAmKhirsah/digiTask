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
          <p>delete</p>
     
  </div>
  </div>
</template>
<script>
import addTask from "../addTask.vue"
export default {
  name: "group-edit",
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
         this.$emit('openCopyGroup')
     }
  },
  components:{
      addTask
  }
};
</script>