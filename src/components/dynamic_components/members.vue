<template>
  <div class="dynamic-members-edit">
    
    <button><i class="fas fa-times"></i></button>
    <div class="header-layout">
      <header>Members</header>
    </div>
    <input type="text" placeholder="Search Members" />
    <p>Board members</p>
    <div v-if="board">
      <ul v-for="member in board.members" :key="member._id">
        <li v-if="member" @click="sendMember(member)">
          <span>{{ member.imgUrl }}</span> <span>{{ member.fullname }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "members",
  props: ["board"],
  methods: {
    sendMember(member) {
      this.$emit("addMember", { ...member });
    },
  },
};
</script>