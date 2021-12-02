<template>
  <div>
    <button><i class="fas fa-times"></i></button>
    <p>Members</p>
    <input type="text" placeholder="Search Members" />
    <p>Board members</p>
    <ul v-for="user in users" :key="user._id">
      <li>
        <span>{{ user.img }}</span> <span>{{ user.fullname }}</span>
        <span>({{ user.username }})</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "members",
};
</script>