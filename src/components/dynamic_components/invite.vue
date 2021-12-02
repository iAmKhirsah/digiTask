<template>
  <section class="dynamic-invite card-layout nav-modal">
    <div class="header-layout">
      <header>Invites</header>
      <button @click="closeModal"><i class="fas fa-times"></i></button>
    </div>
    <div>
      <input class="search" type="text" placeholder="CHANGE INPUT" />
    </div>
    <div v-for="(user, idx) in users" :key="idx">
      <div class="invite-contant">
        <p>AVATAR NEEDED</p>
        <img :src="user.imgUrl" />
        <p class="name-tag">{{ user.username }}</p>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "recent",
  data() {
    return {
      users: [],
      board: {},
      chosenUsers: [],
    };
  },
  async created() {
    await this.$store.dispatch({ type: "loadUsers" });
    this.users = this.$store.getters.users;
    this.board = this.$store.getters.currBoard;

    //Code Below Makes you able to invite people who are not inside the board yet

    // this.users =  users.filter((user)=>{
    //     return  !this.board.members.some((member)=>{
    //        return member._id === user._id
    //     })
    //  })
  },
  methods: {
    choseUser(idx) {
      this.chosenUsers.push(this.users[idx]);
    },
    closeModal() {
      console.log("hello");
      this.$emit("closeModal");
    },
  },
};
</script>