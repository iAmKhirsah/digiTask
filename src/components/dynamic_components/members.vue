<template>
  <div class="dynamic-members-edit card-layout nav-modal">
    <button><i class="fas fa-times"></i></button>
    <div class="header-layout">
      <header>Members</header>
    </div>
    <input type="text" placeholder="Search Members" />
    <p>Board members</p>
    <div v-if="board">
      <ul v-for="member in board.members" :key="member._id">
        <li v-if="member">
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
  computed: {},
};
</script>