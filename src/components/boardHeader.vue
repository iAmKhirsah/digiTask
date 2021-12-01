<template>
  <header class="border-header">
        <div>
          <h1 class="board-box">{{ board.title }}</h1>
        </div>
        <p>board background/img goes here</p>
      </header>
</template>
<script>
export default {
  name: "boardHeader",
  props:['board'],
  data(){
      return{

      }
  },
  created(){

  },
};
</script>