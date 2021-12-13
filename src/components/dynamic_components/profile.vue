<template>
  <section class="dynamic-profile card-layout nav-modal" v-if="getUser"  v-click-outside="closeModal">
    <div class="header-layout">
      <header>Account</header>
      <button @click="closeModal">
        <span class="icon-sm close-icon icon-settings"> </span>
      </button>
    </div>

    <div class="user-info">
      <div class="user-tag-name in-menu">
        <img
          class="image-settings"
          :src="getUser.imgUrl"
          v-if="getUser.imgUrl"
        />
        <span v-else>{{ initials }}</span>
      </div>
      <div class="user-info-details">
        <div>{{ getUser.fullname }}</div>
        <span>{{ getUser.username }}</span>
      </div>
    </div>
    <div class="card-line"></div>
    <button class="user-info-logout-btn" @click="doLogout">Log out</button>
  </section>
</template>
<script>
import vClickOutside from "v-click-outside";
export default {
  name: "profile",
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    doLogout() {
      this.$store.dispatch({ type: "logout" });
      this.$nextTick(() => {
        this.$router.push("/");
      });
    },
  },
  computed: {
    getUser() {
      return this.$store.getters.currUser;
    },
    initials() {
      let initials = this.getUser.fullname.split(" ");
      if (initials.length > 1) {
        initials = initials.shift().charAt(0) + initials.pop().charAt(0);
      } else {
        initials = this.getUser.fullname.substring(0, 2);
      }
      return initials.toUpperCase();
    },
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
};
</script>