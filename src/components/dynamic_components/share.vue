<template>
  <div>
    <button class="close" @click="closeModal">
       <span class="menu-header-close-button"></span>
    </button>
    <p>Share and more...</p>
    <p>POTENTIALLY NOT DOING THIS</p>
  </div>
</template>
<script>
export default {
  name: "share",
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>