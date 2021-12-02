<template>
  <div v-if="board" class="board-details-container">
    <board-header :board="board" />
    <group-list :boardGroups="board.groups" @addTask="addTask" />

    <form v-if="isNewGroup" @submit="addGroup">
      <input v-model="newGroup.title" />
      <button>Add List</button>
      <button @click="toggleNewGroup"><i class="fas fa-times"></i></button>
    </form>
    <button v-else @click="toggleNewGroup">Add another List</button>
    <router-view></router-view>
  </div>
</template>
<script>
import groupList from "../components/groupList.vue";
import boardHeader from "../components/boardHeader.vue";

export default {
  name: "boardDetails",
  data() {
    return {
      board: null,
      isNewGroup: false,
      newGroup: {},
      newTask: {},
    };
  },
  async created() {
    this.newGroup = { ...this.$store.getters.getEmptyGroup };
    this.newTask = { ...this.$store.getters.getEmptyTask };
    let boardId = this.$route.params.boardId;
    await this.$store.dispatch({ type: "loadAndWatchBoard", boardId });
    this.board = this.$store.getters.currBoard;
  },
  methods: {
    toggleNewGroup() {
      this.isNewGroup = !this.isNewGroup;
    },
    async addGroup() {
      try {
        let group = { ...this.newGroup };
        await this.$store.dispatch({ type: "addGroup", group });
        this.newGroup = { ...this.$store.getters.getEmptyGroup };
      } catch (err) {
        console.log("Couldnt add group", group);
      }
    },
    async addTask(groupId) {
      try {
      } catch (err) {
        console.log("Couldnt add task", err);
      }
    },
  },
  computed: {},
  components: { groupList, boardHeader },
};
</script>