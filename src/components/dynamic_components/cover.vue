<template>
  <div class="dynamic-cover-edit">
    <button class="close" @click="closeModal"> <span class="material-icons"> clear </span></button>
    <div class="header-layout">
      <header>Cover</header>
    </div>
    <div class="main-container">
      <div>
        <p>Color</p>
        <div v-for="(color, idx) in colors" :key="idx">
          <div>{{ color }}</div>
        </div>
      </div>
      <div>
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
  methods:{
      closeModal() {
     
      this.$emit("closeModal");
    },
  }
};
</script>