<template>
  <div v-if="board" class="board-details-container">
    <board-header :board="board" />
    <group-list :boardGroups="board.groups" />
   
        <form v-if="isNewGroup" @submit="addGroup">
            <input v-model="newGroup.title"/>
            <button @click="toggleNewGroup"><i class="fas fa-times"></i></button>
            <button submit>Add List</button>
        </form>
        <button v-else @click="toggleNewGroup">Add another List</button>
        
   
  </div>
</template>
<script>
import groupList from "../components/groupList.vue";
import boardHeader from "../components/boardHeader.vue";

export default {
  name: "boardDetails",
  data() {
    return {
      board: null,
      isNewGroup:false,
     newGroup : {}
    };
  },
  async created() {
      this.newGroup = this.$store.getters.getEmptyGroup
    let boardId = this.$route.params.boardId;
    await this.$store.dispatch({ type: "loadAndWatchBoard", boardId });
    this.board = this.$store.getters.currBoard;
  },
  methods:{
 toggleNewGroup(){
  this.isNewGroup = !this.isNewGroup
 },
 async addGroup(){
     try{
         let group = this.newGroup
    await this.$store.dispatch({type:"addGroup",group})
    this.newGroup = this.$store.getters.getEmptyGroup
     }catch(err){
         console.log('Couldnt add group',group)
     }
     

 }


  },
  computed:{

  },
  components: { groupList, boardHeader },
};
</script>