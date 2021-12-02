<template>
  <section class="dynamic-workspace card-layout nav-modal">
    <div class="header-layout">
      <header>Workspaces</header>
      <button @click="closeModal"><i class="fas fa-times"></i></button>
    </div>
    <div>
      <p class="subtitle">Current Workspace</p>
    </div>
    <div class="workspace-contant">
      <div class="name-tag">I</div>
      <p>Ilya Shershniov's workspace</p>
    </div>
    <div class="card-line"></div>
    <div class="card-main-line"></div>
    <div>
      <p class="subtitle">Your Workspaces</p>
    </div>
    <div class="workspace-contant">
      <div class="name-tag">D</div>
      <p>Digitask workspace</p>
    </div>

    <div class="card-main-line"></div>
    <div>
      <p class="subtitle">Guest Workspaces</p>
    </div>
    <div class="workspace-contant">
      <div class="name-tag">I</div>
      <p>Ilya Shershniov's workspace</p>
    </div>
  </section>
</template>
<script>
export default {
  name: "workSpace",
  data() {
    return {
      boards: null,
    };
  },
<<<<<<< HEAD
  methods: {
    closeModal() {
      console.log("hello");
      this.$emit("closeModal");
    },
  },
=======
  methods: {},
>>>>>>> 0c32171cca82cfe1edc6c6cc4994af2afabbf852
};
</script>