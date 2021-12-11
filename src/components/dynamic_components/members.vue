<template>
  <div class="dynamic-members-edit">
    <button class="close" @click="closeModal">
      <span class="menu-header-close-button"></span>
    </button>
    <div class="header-layout">
      <header>Members</header>
    </div>
    <input type="text" placeholder="Search Members" />
    <h5 class="subtitle">Board members</h5>
    <div v-if="getBoard">
      <div v-for="member in getBoard.members" :key="member._id">
        <div
          class="member-info-container"
          v-if="member"
          @click="sendMember(member)"
        >
          <span class="user-tag-name in-header"
            ><img class="image-settings" :src="member.imgUrl"
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
  props: ["board", "task", "user"],
  data() {
    return {
      boardCopy: this.getBoard,
      updatedTask: JSON.parse(JSON.stringify(this.task)),
    };
  },
  created() {},
  methods: {
    sendMember(member) {
      var txt = "";
      let idx = this.updatedTask.members.findIndex(
        (currMember) => currMember._id === member._id
      );
      if (idx > -1) {
        this.updatedTask.members.splice(idx, 1);
        this.boardCopy.activities = this.boardCopy.activities.filter(
          (activity) => {
            if (
              activity.byMember._id === member._id &&
              activity.task.id === this.updatedTask.id
            )
              return false;
            else return true;
          }
        );
        this.$emit("updateTask", this.updatedTask);
        this.$emit("updateBoard", this.boardCopy);
      } else {
        txt = `${this.getUser.fullname} added ${member.fullname} to this card`;
        this.updatedTask.members.push(member);
        this.$emit("taskActivity", txt);
      }
      this.$emit("updateTask", this.updatedTask);
    },
    closeModal() {
      this.$emit("closeModal");
    },
  },
  computed: {
    getBoard() {
      return this.$store.getters.getCurrBoard;
    },
    getUser(){
      return this.$store.getters.currUser
    }
  },
};
</script>