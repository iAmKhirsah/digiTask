<template>
  <section class="dynamic-invite card-layout nav-modal">
    <div class="header-layout">
      <header>Invites</header>
      <button @click="closeModal">
        <span class="material-icons"> clear </span>
      </button>
    </div>
    <div>
      <input class="search" type="text" placeholder="CHANGE INPUT" />
    </div>
    <div v-for="(user, idx) in users" :key="idx">
      <div class="invite-contant" @click="addUser(user)">
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
    // this.board = this.$store.getters.getCurrBoard;
    this.boardToUpdate = JSON.parse(JSON.stringify(this.getCurrBoard));
    //Code Below Makes you able to invite people who are not inside the board yet
    // this.users =  users.filter((user)=>{
    //     return  !this.board.members.some((member)=>{
    //        return member._id === user._id
    //     })
    //  })
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
  },
};
</script>