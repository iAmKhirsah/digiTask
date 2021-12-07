<template>
  <section class="dynamic-workspace card-layout nav-modal">
    <div class="header-layout">
        <button @click="goBack"><i class="fas fa-chevron-left"></i></button>
      <header>Copy list</header>
      <button @click="closeModal"> <span class="material-icons"> clear </span></button>
    </div>
    <div>
      <p class="subtitle">Name</p>
    </div>
   
    <form @submit.prevent="createGroup">
        <textarea
          ref="group"
        
          oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
          onfocus='this.style.height = "";this.style.height = this.scrollHeight + "px"'
          v-model="newTask"
          maxlength="512"
     
        />
                <button type="submit">Create list</button>
    </form>
</template>
<script>
export default {
  name: "copy",
  props:['group'],
  data(){
      return {
        newGroupTitle:null
      }
  },
  created(){
      this.newGroupTitle = {...this.group.title}
        this.$nextTick(() => {
        this.$refs.group.focus();
        this.$refs.group.select()
      });
  },
  methods:{
      createGroup(){

      },
      goBack(){
          this.$emit('backToGroupEdit')
      },
        closeModal() {
     
      this.$emit("closeModal");
    },
  }
};
</script>