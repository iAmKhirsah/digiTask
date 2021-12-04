<template>
  <div class="dynamic-members-edit">
    <button class="close" @click="closeModal">
      <i class="fas fa-times"></i>
    </button>
    <div class="header-layout">
      <header>Members</header>
    </div>
    <input type="text" placeholder="Search Members" />
    <h5 class="subtitle">Board members</h5>
    <div v-if="board">
      <div v-for="member in board.members" :key="member._id">
        <div
          class="member-info-container"
          v-if="member"
          @click="sendMember(member)"
        >
          <span class="user-tag-name in-header"
            ><img :src="member.imgUrl"
          /></span>
          <span>{{ member.fullname }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "members",
  props: ["board"],
  data() {
    return {
      boardCopy: JSON.parse(JSON.stringify(this.board)),
    };
  },
  methods: {
    sendMember(member) {
      let idx = this.boardCopy.members.indexOf(member._id);
      if (idx > -1) this.boardCopy.members.splice(idx, 1);
      else this.boardCopy.members.push(member);
      // this.$emit("addMember", this.boardCopy);
      this.$emit("addMember", member);
    },
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>