<template>
  <div class="dynamic-cover-edit">
    <button class="close" @click="closeModal">
      <span class="material-icons"> clear </span>
    </button>
    <div class="header-layout">
      <header>Cover</header>
    </div>
    
    <div class="main-container">
      <p>Size</p>
      <div class="size-preview">
        <div class="layout with-info" :class="infoSelected" @click="selectMode(true)" >
          <div class="top-preview-bgc" :style="sizeBgc"></div>
          <div class="line-1"><div class="mini-line-1"></div><div class="mini-line-2"></div><span class="mini-circle"></span></div>
          <div class="line-2"></div><div class="line-3"></div>
          
          </div>
          <div class="layout no-info" @click="selectMode(false)" :style="sizeBgc" :class="noInfoSelected">
      
            <div class="line-1">
              </div>
              <div class="line-2">
              </div>
      </div>
      </div>
       <button @click="removeCover" v-if="taskBgc">Remove Cover</button>
      <p>Color</p>
      <div class="color-button-container">
        <div v-for="(color, idx) in colors" :key="idx" @click="setCover(color)">
          <div :style="'background:' + color" class="color-button" :class="{'selected-cover':color===pickedColor}" ></div>
        </div>
      </div>
      <div class="dynamic-attachment-edit">
        <p>Attachments</p>
        <button>Upload a cover image</button>
      </div>
      <div>UNSPLASH?</div>
      <div>SEARCH PHOTOS?</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "cover",
  props: ["task"],
  data() {
    return {
      updatedTask: JSON.parse(JSON.stringify(this.task)),
      colors: [
        "#7BC86C",
        "#F5DD29",
        "#FFAF3F",
        "#EF7564",
        "#CD8DE5",
        "#5BA4CF",
        "#29CCE5",
        "#6DECA9",
        "#FF8ED4",
      ],
      pickedColor:null
    };
  },
  created(){
    this.pickedColor = this.updatedTask.style.bgColor
  },
  methods: {
    selectMode(state){
      if(!this.updatedTask.style.bgColor) return
      this.updatedTask.style.isInfo = state
       this.$emit('updateTask', this.updatedTask)
    },
    closeModal() {
      this.$emit("closeModal");
    },
    setCover(color) {
      this.updatedTask.style.bgColor = color;
      this.pickedColor = color
      this.$emit('updateTask', this.updatedTask)
    },
    removeCover(){
      this.updatedTask.style.bgColor = ''
      this.pickedColor = ''
      this.$emit('updateTask',this.updatedTask)
    }
  },
  computed:{
    sizeBgc(){
      return {background:this.updatedTask.style.bgColor}
    },
    infoSelected(){
      return {'selected-cover': this.updatedTask.style.isInfo && this.updatedTask.style.bgColor }
    },
    noInfoSelected(){
    return {'selected-cover': !this.updatedTask.style.isInfo && this.updatedTask.style.bgColor}  
    },
    taskBgc(){
      return this.updatedTask.style.bgColor
    },
    
      
  }
};
</script>