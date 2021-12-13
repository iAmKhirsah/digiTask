<template>
  <section class="user-menu " >
    <div v-if="!type">
   
        <button class="close" @click="closeShowMenu">
       <span class="menu-header-close-button"></span>
    </button>
      <div class="header-layout">
        <header>Menu</header>
      </div>
      <div class="menu-content">
        <div class="menu-box">
          <div>
            <div>About this board</div>
            <p>Add a description to your board</p>
          </div>
          <span class="icon-board"></span>
        </div>

        <div class="menu-box" @click="openModal('background')">
          <div>Change background</div>
          <span class="icon-background" :style="getBackground"></span>
        </div>
        <!-- Ilia we need here another componenet? -->
        <div class="menu-box">
          <div class="labels" @click="openModal('label')">
            <div>Labels</div>
            <span class="icon-board"></span>
          </div>
        </div>
        <div class="menu-box" @click="isDeleting=true" >
          <div>Close board...</div>
        </div>
         <div class=" dynamic-archive-edit card-layout nav-modal " v-if="isDeleting"  v-click-outside="closeDeleteModal">
     <button class="close" @click="closeDeleteModal">
       <span class="menu-header-close-button" ></span>
    </button>
    <div>
      <header>
         <span>Delete Board</span>
      </header>
    </div>
    <div class="main-container" >
      <p>{{deleteBoardText}}
      </p>
      <button @click="removeBoard" class="delete" v-if="isBoardCreator">Delete</button>
    </div>
  </div>
        
        <div>
    </div>
        <div class="activity-container">
          <div class="menu-box">
            <div class="activity">
              <div class="activity-bold">Activity</div>
              <span class="icon-board"></span>
            </div>
          </div>
        </div>
        <!-- Ilya Activities Component -->
        <div class="menu-box no-hover">
          <activity-flow :board="board"/>
          <!-- <div>Activities Component</div> -->
        </div>
      </div>
    </div>
    <labels v-if="type==='label'"
    @closeModal="closeShowMenu"
    @createLabel="createLabel"
    @deleteLabel="deleteLabel"
    @goBack="goBack"
    :isBoardLabels="isBoardLabels"
    />
    <background
      :board="board"
      @updateBoard="updateBoard"
      @goBack="goBack"
      @closeShowMenu="closeShowMenu"
      v-if="type === 'background'"
    />
  </section>
</template>
<script>
import background from "../components/background.vue";
import labels from "../components/dynamic_components/labels.vue"
import vClickOutside from "v-click-outside";
import activityFlow from './activityFlow.vue'
export default {
  props: ["board"],
  data() {
    return {
      type: "",
      isDeleting:false,
      isBoardLabels:true,
    };
  },
  methods: {
    async removeBoard(){
      try{
        await this.$emit('removeBoard',this.board._id)
      this.$router.push('/workspace')
      }
      catch(err){
        console.log('Board couldnt be removed',err)
    
      }
    },
    async deleteLabel(label) {
      try {
        await this.$store.dispatch({ type: "deleteLabel", label });
      } catch (err) {
        console.log("Error on DELETELABEL in TASKDETAILS");
      }
    },
    
    goBack() {
      this.type = "";
    },
    openModal(type) {
      
      this.type = type;
    },
    updateBoard(board) {
      this.$emit("updateBoard", board);
    },
    toggleMenu() {
      this.$emit("toggleMenu");
    },
    closeShowMenu(){
      this.type=""
      this.$emit('closeMenu')
    },
    closeDeleteModal(){
      this.isDeleting = false
    },
    async createLabel(label){
      await this.$store.dispatch({ type: "createLabel", label });
    }
  },
  computed: {
       getBackground(){
      if(this.board.style.backgroundColor) return {'background-color': this.board.style.backgroundColor}
      return {'background-image': `url(${require('@/assets/img/'+this.board.style.backgroundUrl)})`}
    },
    getCurrUser(){
      return this.$store.getters.currUser
    },
    isBoardCreator(){
      let boardCreator = this.board.createdBy._id
      let userId = this.getCurrUser._id
      return boardCreator === userId
    },
    deleteBoardText(){
      if(this.isBoardCreator)
      return 'Are you sure? Board will be removed and you wont be able get it back'
      return 'You Are not allowed to perform this action'
    }
  },
  components: {
    background,labels,activityFlow
  },
   directives: {
    clickOutside: vClickOutside.directive,
  },
};
</script>