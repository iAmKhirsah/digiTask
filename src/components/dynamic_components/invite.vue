<template>
  <section class="dynamic-invite card-layout nav-modal">
    <div class="header-layout">
      <header>Invites</header>
      <button class="close" @click="closeModal">
        <span class="menu-header-close-button"></span>
      </button>
    </div>
    <div>
      <input type="text" placeholder="Search Members " />
    </div>
    <div class="card-line"></div>
     <div class="users-invite-container">
    <div v-for="(user, idx) in filterUsers" :key="idx">
      <div class="invite-content" @click="addUser(user)">
        <span class="user-tag-name in-header">
          <img class="image-settings" :src="user.imgUrl"
        /></span>
        <p class="name-tag">{{ user.username }}</p>
        <span class="icon-settings icon-sm v-sign  on-invite"></span
            >
      </div>
        <!-- <span class="user-tag-name in-header">
          <img class="image-settings" :src="user.imgUrl" v-if="user.imgUrl" />
          <span v-else>{{ initials }}</span> -->
        <!-- </span> -->
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "recent",
  props: ["board"],
  data() {
    return {
      users: [],
      boardToUpdate: {},
      chosenUsers: [],
    };
  },
  async created() {
    await this.$store.dispatch({ type: "loadUsers" });
    this.users = this.$store.getters.users;
    this.boardToUpdate = JSON.parse(JSON.stringify(this.getCurrBoard));
  },
  methods: {
    addUser(user) {
      let addedUser = {
        _id: user._id,
        fullname: user.fullname,
        imgUrl: user.imgUrl,
      };
      let idx = this.boardToUpdate.members.findIndex(
        (member) => member._id === addedUser._id
      );
      if (idx > -1) this.boardToUpdate.members.splice(idx, 1);
      else this.boardToUpdate.members.push(addedUser);
      this.$emit("updateBoard", JSON.parse(JSON.stringify(this.boardToUpdate)));
    },
    closeModal() {
      this.$emit("closeModal");
    },
  },
  computed: {
    getCurrBoard() {
      return this.$store.getters.getCurrBoard;
    },
    getUsers() {
      return this.$store.getters.users;
    },
    filterUsers() {
      if (!this.filterBy) return this.getUsers;
      let filteredUsers = this.getUsers.filter((user) => {
        return user.fullname
          .toLowerCase()
          .includes(this.filterBy.toLowerCase());
      });
      return filteredUsers;
    },
    initials() {
      let initials = this.getUsers.forEach((user) => user.fullname.split(" "));
      if (initials.length > 1) {
        initials = initials.shift().charAt(0) + initials.pop().charAt(0);
      } else {
        initials = this.getUsers.forEach((user) =>
          user.fullname.substring(0, 2)
        );
      }
      return initials.toUpperCase();
    },
  },
};
</script>