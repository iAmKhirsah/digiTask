<template>
  <div>
    <button><i class="fas fa-times"></i></button>
    <p>Cover</p>
    <div>
      <div>
        <p>Size</p>
        <div>SIZES</div>
      </div>
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
};
</script>