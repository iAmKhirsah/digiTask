<template>
  <header class="board-header">
    <div class="board-box">
      <input :style="inputWidth" v-model="board.title" />
    </div>
    <div class="board-box star" @click="toggleStar">
      <span v-if="!isStarred"><i class="far fa-star"></i></span>
      <span v-else><i class="fas fa-star"></i></span>
    </div>
    <div>
        <div v-for="(user,idx) in board.memebers" :key="idx" class="members">
            <span class="member"></span>
        </div>
         <div class="board-box invite" @click="setType('invite')">Invite</div >
    </div>
    <header-dynamic :type="type" ></header-dynamic>
  </header>
</template>
<script>
import headerDynamic from "./headerDynamic.vue";
export default {
    
  name: "boardHeader",
  props: ["board"],
  data() {
    return {
      isStarred: false,
      type:'',
    };
  },
  created() {},
  computed: {
    inputWidth() {
      return { width: this.board.title.length * 10 + 24 + "px" };
    },
  },
  methods:{
    toggleStar(){
      this.isStarred = !this.isStarred
    },
    setType(type){
    this.type=type
    }
  },
  components:{
    headerDynamic
  }
};
</script>