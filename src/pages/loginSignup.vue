<template>
  <div class="login-signup-container">
    <section class="signup-form" v-show="isSignup">
      <h1>Signup</h1>
      <form @submit.prevent="doSignup">
        <input
          placeholder="Username..."
          v-model="signupCred.username"
          minlength="3"
          clearable
        />
        <input
          placeholder="Password...."
          minlength="5"
          v-model="signupCred.password"
          show-password
        />
        <button>Signup</button>
      </form>
    </section>
    <section class="login-form" v-show="!isSignup && !loggedinUser">
      <h1>Login</h1>
      <form @submit.prevent="doLogin">
        <input
          placeholder="Username..."
          v-model="loginCred.username"
          minlength="3"
          clearable
        />
        <input
          placeholder="Password...."
          type="password"
          minlength="5"
          v-model="loginCred.password"
        />
        <button>Login</button>
      </form>
    </section>
    {{ msg }}
    <div>
      <button @click="showSignup">{{ loginSignup }}</button>
      <button @click="doLogout" v-if="loggedinUser">Logout</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "loginSignup",
  data() {
    return {
      loginCred: { username: "", password: null },
      signupCred: { username: "", password: null },
      isSignup: false,
      msg: "",
    };
  },
  methods: {
    showSignup() {
      this.isSignup = !this.isSignup;
    },
    async doLogin() {
      if (!this.loginCred.username) {
        this.msg = "Please enter username/password";
        return;
      }
      try {
        await this.$store.dispatch({ type: "login", userCred: this.loginCred });
        this.$router.push("/workspace");
      } catch (err) {
        console.log(err);
        this.msg = "Failed to login";
      }
    },
    async doSignup() {
      if (!this.signupCred.password || !this.signupCred.username) {
        this.msg = "Please fill up the form";
        return;
      }
      await this.$store.dispatch({ type: "signup", userCred: this.signupCred });
      this.$router.push("/workspace");
    },
    doLogout() {
      this.$store.dispatch({ type: "logout" });
    },
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.currUser;
    },
    loginSignup() {
      return this.isSignup
        ? "Already existing user?"
        : "Register a new Account";
    },
  },
};
</script>
