<template>
  <section class="dynamic-profile card-layout nav-modal">
    <div class="header-layout">
      <header>Account</header>
      <button><i class="fas fa-times"></i></button>
    </div>

    <div class="user-info">
      <div>pic</div>
      <div>
        <div>fullname</div>
        <span>mail</span>
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
};
</script>