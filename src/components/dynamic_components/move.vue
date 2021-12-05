<template>
  <div class="dynamic-move-edit" >
    <button class="close" @click="closeModal"><i class="fas fa-times"></i></button>
     <div class="header-layout">
      <header>Move card</header>
    </div>
  
    <div>
      <div  class="main-container">
      <p>Select destination</p>

      <div>BOARD HERE</div>
      <div>LIST HERE</div>
      <div>POSITION?</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "move",
  methods:{
      closeModal() {
     
      this.$emit("closeModal");
    },
  }
};
</script>