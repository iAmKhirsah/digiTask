<template>
  <div>
    <button @click="closeModal"><i class="fas fa-times"></i></button>
    <p>Move card</p>
    <div>
      <p>Select destination</p>
      <div>BOARD HERE</div>
      <div>LIST HERE</div>
      <div>POSITION?</div>
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