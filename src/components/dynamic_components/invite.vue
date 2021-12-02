<template>
  <section class="dynamic-invite card-layout nav-modal">
    <div class="header-layout">
      <header>Invites</header>
    </div>
    <div>
      <p class="subtitle">Current Workspace</p>
    </div>
    <div class="workspace-contant">
      <div class="name-tag">I</div>
      <p>Ilya Shershniov's workspace</p>
    </div>
  </section>
</template>
<script>
export default {
  name: "recent",
  data() {
    return {
      users: [],
    };
  },
  async created(){
      await this.$store.dipatch({type:'loadUsers'})
      this.users = this.$store.getters.userss
  }
};
</script>