<template>
  <div class="dynamic-cover-edit">
    <button class="close" @click="closeModal">
      <span class="menu-header-close-button"></span>
    </button>
    <div class="header-layout">
      <header>Cover</header>
    </div>

    <div class="main-container">
      <p class="subtitles top">Size</p>
      <div class="size-preview">
        <div
          class="layout with-info"
          :class="infoSelected"
          @click="selectMode(true)"
          title="Small"
        >
          <div class="top-preview-bgc" :style="sizeBgc"></div>
          <div class="line-1">
            <div class="mini-line-1"></div>
            <div class="mini-line-2"></div>
            <span class="mini-circle"></span>
          </div>
          <div class="line-2"></div>
          <div class="line-3"></div>
        </div>
        <div
          class="layout no-info"
          @click="selectMode(false)"
          :style="sizeBgc"
          :class="noInfoSelected"
          title="Large"
        >
          <div class="line-1"></div>
          <div class="line-2"></div>
        </div>
      </div>
      <button @click="removeCover" v-if="taskBgc">Remove Cover</button>
      <p class="subtitles">Color</p>
      <div class="color-button-container">
        <div v-for="(color, idx) in colors" :key="idx" @click="setCover(color,'color')">
          <div
            :style="'background:' + color"
            class="color-button"
            :class="{ 'selected-cover': color === pickedColor }"
          ></div>
        </div>
      </div>
      <div class="dynamic-attachment-edit">
        <p class="subtitles">Attachments</p>
        <div class="cover-attachments">
        <div v-for="attachment in getTaskAttachments" :key="attachment.id" >
          <img :class="{'selected-cover': attachment.imgUrl === pickedImg}" :src="attachment.imgUrl" @click="setCover(attachment.imgUrl)" :title="attachment.txt" >
        </div>
        </div>
        <label>
      <span class="subtitle" title="Upload cover image">Upload a cover image</span>
      <input type="file" @change="addAttachment" hidden />
    </label>
      </div>
      <!-- <div>UNSPLASH?</div>
      <div>SEARCH PHOTOS?</div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "cover",
  props: ["task"],
  data() {
    return {
      updatedTask: null,
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
      pickedColor: null,
      pickedImg:null
    };
  },
  created() {
    this.updatedTask = JSON.parse(JSON.stringify(this.task))
    this.pickedColor = this.updatedTask.style.bgColor;
    this.pickedImg = this.updatedTask.style.imgUrl
  },
  methods: {
    selectMode(state) {
      if (!this.updatedTask.style.bgColor && !this.updatedTask.style.imgUrl) return;
      this.updatedTask.style.isInfo = state;
       let task = JSON.parse(JSON.stringify(this.updatedTask))
      this.$emit("updateTask", task);
      
    },
    addAttachment(ev) {
      this.$emit("attachment", ev);
    },
    closeModal() {
      this.$emit("closeModal");
    },
    setCover(style,type='img') {
      if(type==='color'){
        this.updatedTask.style.bgColor = style;
      this.pickedColor = style;
      this.updatedTask.style.imgUrl = ''
      this.pickedImg = null
      }
      else{
        this.updatedTask.style.imgUrl = style;
      this.pickedImg = style;
      this.updatedTask.style.bgColor = ''
      this.pickedColor = null
      }
      this.selectMode(this.updatedTask.style.isInfo)
      let task = JSON.parse(JSON.stringify(this.updatedTask))
      this.$emit("updateTask", task);
     
    },
    removeCover() {
      this.updatedTask.style.bgColor = "";
      this.updatedTask.style.imgUrl = ""
      this.pickedColor = "";
      this.pickedImg = ""
      this.$emit("updateTask", this.updatedTask);
    },
  },
  computed: {
    sizeBgc() {
      if(this.updatedTask.style.bgColor )  return { background: this.updatedTask.style.bgColor };
      else return { 'background-image': 'url('+this.updatedTask.style.imgUrl+')' };
      
    },
    infoSelected() {
      return {
        "selected-cover":
          this.updatedTask.style.isInfo && (this.updatedTask.style.bgColor||this.updatedTask.style.imgUrl),
      };
    },
    noInfoSelected() {
      return {
        "selected-cover":
          !this.updatedTask.style.isInfo && (this.updatedTask.style.bgColor||this.updatedTask.style.imgUrl),
      };
    },
    taskBgc() {
      return this.updatedTask.style.bgColor;
    },
    getTask(){
      return this.$store.getCurrTask
    },
    getTaskAttachments(){
      let taskAtts = []
      this.$store.getters.getCurrBoard.attachments.forEach((att)=>{
        if(att.task.id===this.task.id) taskAtts.push(att)
      })
      return taskAtts
      },
     
    
  },
};
</script>