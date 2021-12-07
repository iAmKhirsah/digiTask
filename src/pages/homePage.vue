<template>
  <div class="home">
    <div>
      <router-link to="/signup">Signup Placeholder</router-link>
    </div>
    <p @click="setGuest">Get Started</p>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  methods: {
    async setGuest() {
      await this.$store.dispatch({
        type: "signup",
        userCred: { username: "Guest", fullname: "Guest" },
      });
      this.$router.push("/workspace");
    },
  },
};
</script>
