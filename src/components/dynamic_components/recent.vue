<template>
  <section class="dynamic-recent">
       <!-- <button @click="closeModal"> <span class="material-icons"> clear </span></button> -->
    <div v-for="(board, idx) in recentBoards" :key="idx">
      {{ board }}
    </div>
  </section>
</template>
<script>
export default {
  name: "recent",
  data() {
    return {
      recentBoards: null,
    }
  },
  methods:{
        closeModal(){
      console.log('hello');
      this.$emit('closeModal')
    }
  }
};
</script>