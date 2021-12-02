<template>
  <div v-if="board" class="board-details-container ">
    <board-header :board="board" />
    <div class="group-list-container">
    <div  v-for="group in board.groups" :key="group.id">
    <group-list
      :group="group"
      @addTask="addTask"
      @updateGroup="updateGroup"
    />
    </div>

    <form v-if="isNewGroup" @submit="addGroup">
      <input v-model="newGroup.title" />
      <button>Add List</button>
      <button @click="toggleNewGroup"><i class="fas fa-times"></i></button>
    </form>
    <!-- <button class="add-list-btn" v-else @click="toggleNewGroup">Add another List</button> -->

    <button v-else @click="toggleNewGroup">Add another List</button>
    </div>
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
    async updateGroup(group) {
      await this.$store.dispatch({ type: "updateGroup", group });
    },
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
    async addTask(task, groupId) {
      try {
        await this.$store.dispatch({ type: "addTask", task, groupId });
      } catch (err) {
        console.log("Couldnt add task", err);
      }
    },
  },
  computed: {},
  components: { groupList, boardHeader },
};
</script>