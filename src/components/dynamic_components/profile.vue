<template>
  <section class="dynamic-profile card-layout nav-modal">
    <div class="header-layout">
      <header>Account</header>
      <button @click="closeModal"><i class="fas fa-times"></i></button>
    </div>

    <div class="user-info">
      <div class="user-tag-name in-menu">DM</div>
      <div class="user-info-details">
        <div>Dennis Miller</div>
        <span>DennisMiller@gmail.com</span>
      </div>
    </div>

    <hr />
    <div>
      <p>Profile?</p>
      <p>Activity</p>
    </div>

    <div>Logout</div>
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