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
        userCred: {
          username: "Guest",
          fullname: "Guest",
          imgUrl: "https://media.wired.co.uk/photos/60c8730fa81eb7f50b44037e/3:2/w_3329,h_2219,c_limit/1521-WIRED-Cat.jpeg",
          starred: [],
          recentBoards: [],
          mentions: [],
        },
      });
      this.$router.push("/workspace");
    },
  },
};
</script>
