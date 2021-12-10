<template>
  <div class="home">
  <!-- <div>
      
    </div> -->

    <section class="homepage-content">
      <nav class="homepage-nav">
        <div class="homepage-logo">
          <span class="trello-logo"><i class="fab fa-trello"></i></span>
          <div class="logo main-header-tabs"></div>
          <span class="app-title">DigiTask</span>
        </div>
        <div class="user-actions">
          <div class="login"><router-link to="/signup">Log in</router-link></div>
          <div class="signup"><router-link to="/signup">Sign up</router-link></div>
        </div>
      </nav>

      <div class="main-content">
        <div class="main-hero">
          <h2 class="main-content-header">
            Digitask helps teams move work forward.
          </h2>
          <p class="main-info">
            Collaborate, manage projects, and reach new productivity peaks. From
            high rises to the home office, the way your team works is
            unique-accomplish it all with Digitask.
          </p>
          <button class="get-started-btn" @click="setGuest">
            Get started - it’s free!
          </button>
        </div>
        <div class="homepage-image-container">
          <img
            src="https://d2k1ftgv7pobq7.cloudfront.net/meta/p/res/images/spirit/hero/6a3ccd8e5c9a0e8ebea4235d12da6b24/hero.png"
          />
        </div>
      </div>
      <div class="footer-title">
        <p>It’s more than work. It’s a way of working together.</p>
        <p>
          Start with a Digitask board, lists, and cards. Customize and expand with
          more features as your teamwork grows. Manage projects, organize tasks,
          and build team spirit-all in one place.
        </p>
      </div>
    </section>
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
          imgUrl:
            "https://media.wired.co.uk/photos/60c8730fa81eb7f50b44037e/3:2/w_3329,h_2219,c_limit/1521-WIRED-Cat.jpeg",
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
