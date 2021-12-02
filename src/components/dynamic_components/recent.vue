<template>
  <section class="dynamic-recent">
       <!-- <button @click="closeModal"><i class="fas fa-times"></i></button> -->
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