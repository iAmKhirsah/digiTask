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
      <div></div>
       <button @click="removeCover">Remove Cover</button>
      <p>Color</p>
      <div class="color-button-container">
        <div v-for="(color, idx) in colors" :key="idx" @click="setCover(color)">
          <div :style="'background:' + color" class="color-button"></div>
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
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    setCover(color) {
      this.updatedTask.style.bgColor = color;
      this.$emit('updateTask', this.updatedTask)
    },
    removeCover(){
      this.updatedTask.tyle.bgolor = ''
      this.$emit('updateTask',this.updatedTask)
    }
  },
};
</script>