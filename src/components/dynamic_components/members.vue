<template>
  <div class="dynamic-members-edit">
    <button class="close" @click="closeModal">
      <span class="menu-header-close-button"></span>
    </button>
    <div class="header-layout">
      <header>Members</header>
    </div>
    <input type="text" placeholder="Search Members" v-model="filterBy" />
    <h5 class="subtitle">Board members</h5>
    <div v-if="getBoard">
      <div v-for="member in filterMembers" :key="member._id">
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
      boardCopy: null,
      updatedTask: JSON.parse(JSON.stringify(this.task)),
      filterBy: "",
    };
  },
  created() {
    this.boardCopy = JSON.parse(JSON.stringify(this.getBoard));
    console.log(this.getBoard);
  },
  methods: {
    sendMember(member) {
      console.log(this.boardCopy);
      var txt = "";
      let idx = this.updatedTask.members.findIndex(
        (currMember) => currMember._id === member._id
      );
      if (idx > -1) {
        this.updatedTask.members.splice(idx, 1);
        this.boardCopy.activities = this.boardCopy.activities.filter(
          (activity) => {
            console.log(activity);
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
        this.$nextTick(() => {
          this.boardCopy = JSON.parse(JSON.stringify(this.getBoard));
          this.updatedTask = JSON.parse(JSON.stringify(this.task));
        });
      } else {
        console.log("im here");
        txt = `${this.getUser.fullname} added ${member.fullname} to this card`;
        this.updatedTask.members.push(member);
        this.$emit("taskActivity", txt);
      }
      this.$emit("updateTask", this.updatedTask);
      this.$nextTick(() => {
        this.boardCopy = JSON.parse(JSON.stringify(this.getBoard));
        this.updatedTask = JSON.parse(JSON.stringify(this.task));
      });
    },
    closeModal() {
      this.$emit("closeModal");
    },
  },
  computed: {
    getBoard() {
      return this.$store.getters.getCurrBoard;
    },
    getUser() {
      return this.$store.getters.currUser;
    },
    filterMembers() {
      if (!this.filterBy) return this.boardCopy.members;
      let filteredMembers = this.boardCopy.members.filter((member) => {
        return member.fullname
          .toLowerCase()
          .includes(this.filterBy.toLowerCase());
      });
      return filteredMembers;
    },
  },
};
</script>