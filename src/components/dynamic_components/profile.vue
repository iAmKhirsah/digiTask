<template>
  <section class="dynamic-profile card-layout nav-modal">
    <div class="header-layout">
      <header>Account</header>
      <button @click="closeModal">
        <span class="material-icons"> clear </span>
      </button>
    </div>

    <div class="user-info">
      <div class="user-tag-name in-menu">DM</div>
      <div class="user-info-details">
        <div>Dennis Miller</div>
        <span>DennisMiller@gmail.com</span>
      </div>
    </div>

    <div class="card-line"></div>
    <div class="user-activity">
      <p>Profile and visibility</p>
      <p>Activity</p>
    </div>
    <div class="card-line"></div>

    <button class="user-info-logout-btn">Log out</button>
  </section>
</template>
<script>
export default {
  name: "profile",
  data() {
    return {};
  },
  methods: {
    closeModal() {
      console.log("hello");
      this.$emit("closeModal");
    },
  },
};
</script>