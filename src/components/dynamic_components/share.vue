<template>
  <div>
    <button @click="closeModal"><i class="fas fa-times"></i></button>
    <p>Share and more...</p>
    <p>POTENTIALLY NOT DOING THIS</p>
  </div>
</template>
<script>
export default {
  name: "share",
  methods:{
      closeModal() {
     
      this.$emit("closeModal");
    },
  }
};
</script>