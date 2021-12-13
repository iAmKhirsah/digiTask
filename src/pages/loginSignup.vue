<template>
  <div class="login-signup-container">
    <header>
      <div class="homepage-logo">
        <span class="trello-logo"><i class="fab fa-trello"></i></span>
        <div class="logo main-header-tabs"></div>
        <span class="app-title">DigiTask</span>
      </div>
    </header>
    <div class="forms-sections">
      <!-- first -->

      <section class="signup-form" v-show="isSignup">
        <h1>Sign up for your account</h1>
        <form @submit.prevent="doSignup">
          <input
            placeholder="Username"
            v-model="signupCred.username"
            minlength="3"
            clearable
          />
          <input
            type="text"
            placeholder="Fullname"
            v-model="signupCred.fullname"
            minlength="3"
            clearable
          />
          <input
            placeholder="Password"
            type="password"
            minlength="5"
            v-model="signupCred.password"
            show-password
          />
          <p class="terms">
            By signing up, you confirm that you've read and accepted our
            <span>Terms of Service</span> and <span>Privacy Policy.</span>
          </p>
          <button :class="['signup-btn', isEnabled]">Signup</button>
        </form>
        <div class="line-divider"></div>
        <div class="login-switch">
          <div>
            <div class="error-msg">
              {{ msg }}
            </div>
            <button @click="showSignup">{{ loginSignup }}</button>
            <div>
              <button @click="doLogout" v-if="loggedinUser">Logout</button>
            </div>
          </div>
        </div>
      </section>

      <!-- sec -->

      <section class="signup-form" v-show="!isSignup && !loggedinUser">
        <h1>Log in to Digitask</h1>
        <form @submit.prevent="doLogin">
          <input
            placeholder="Username"
            v-model="loginCred.username"
            minlength="3"
            clearable
          />
          <input
            placeholder="Password"
            type="password"
            minlength="5"
            v-model="loginCred.password"
          />
          <p class="terms">
            By signing up, you confirm that you've read and accepted our
            <span>Terms of Service</span> and <span>Privacy Policy.</span>
          </p>
          <button class="login-btn">Login</button>
        </form>
        <div class="line-divider"></div>
        <div class="login-switch">
          <div>
            <div class="error-msg">
              {{ msg }}
            </div>
            <button @click="showSignup">{{ loginSignup }}</button>
            <div>
              <button @click="doLogout" v-if="loggedinUser">Logout</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  name: "loginSignup",
  data() {
    return {
      loginCred: { username: "", password: null },
      signupCred: {
        username: "",
        fullname: "",
        password: null,
        imgUrl: "",
        mentions: [],
        starred: [],
        recentBoards: [],
      },
      isSignup: true,
      msg: "",
    };
  },
  created() {
    if (this.$route.params.login) this.isSignup = false;
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
    isEnabled() {
      return {
        enable:
          this.signupCred.username.length > 3 &&
          this.signupCred.fullname.length > 3 &&
          this.signupCred.password.length > 3,
      };
    },
  },
};
</script>
