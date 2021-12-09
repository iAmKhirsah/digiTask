<template>
  <section>
    <component
      :is="renderCmp"
      @closeModal="closeModal"
      @updateBoard="updateBoard"
      @updateUser="updateUser"
      @loadBoard="loadBoard"
      :getCurrBoard="getCurrBoard"
      :getUser="getUser"
      :getBoards="getBoards"
    ></component>
  </section>
</template>
<script>
import profile from "./dynamic_components/profile.vue";
import recent from "./dynamic_components/recent.vue";
import starred from "./dynamic_components/starred.vue";
import workSpace from "./dynamic_components/workSpace.vue";
import invite from "./dynamic_components/invite.vue";
import boardCreate from './boardCreate.vue'

export default {
  name: "headerDynamic",
  props: ["type", "getCurrBoard", "getUser", "getBoards"],
  data() {
    return {};
  },
  computed: {
    renderCmp() {
      if (this.type === "profile") return profile;
      else if (this.type === "recent") return recent;
      else if (this.type === "starred") return starred;
      else if (this.type === "workSpace") return workSpace;
      else if (this.type === "invite") return invite;
      else if (this.type === "create") return boardCreate;
    },
  },
  components: {
    profile,
    recent,
    starred,
    workSpace,
  },
  methods: {
    updateBoard(board) {
      console.log(board);
      this.$emit("updateBoard", board);
    },
    loadBoard(boardId) {
      this.$emit("loadBoard", boardId);
    },
    closeModal() {
      this.$emit("closeModal");
    },
    updateUser(user) {
      this.$emit("updateUser", user);
    },
  },
};
</script>