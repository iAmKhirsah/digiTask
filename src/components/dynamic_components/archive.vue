<template>
  <div class="dynamic-cover-edit">
     <button class="close" @click="closeModal"><i class="fas fa-times"></i></button>
    <div class="header-layout">
      <header>Delete <span>{{whichDelete}}</span></header>
    </div>
    <p>
      All actions will be removed from the activity feed and you won’t be able
      to re-open the card. There is no undo.
    </p>
    <button @click="deleteThis">Delete</button>
  </div>
</template>
<script>
export default {
  name: "archive",
  props:{ isGroup:{
          type:Boolean,
          default:false
      }},
  methods: {
    deleteThis() {
    this.isGroup ? this.$emit("deleteGroup") : this.$emit("deleteTask")
    this.closeModal()
      
    },
      closeModal() {
     
      this.$emit("closeModal");
    },
  },
  computed:{
    whichDelete(){
      return this.isGroup ? 'list' : 'card'
    }
  }
};
</script>