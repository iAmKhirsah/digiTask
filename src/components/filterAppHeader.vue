<template>
  <div>
    <input
      type="text"
      v-model="filterBy.title"
      placeholder="Search"
      @change="setFilter"
    />
    <div class="filter-search-result" v-if="showSearch">
      <div v-for="task in filteredTasks" :key="task.id">
        <div @click="goToTask(task)">
          <h3>{{ task.taskName }}</h3>
          <p>in</p>
          <h3>{{ task.groupName }}</h3>
          <h3><span>on</span>{{ task.boardName }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { utilService } from "../services/utilService";
export default {
  props: ["boards"],
  name: "filterAppHeader",
  data() {
    return {
      filterBy: {
        title: "",
      },
      // boards: null,
      boardFilter: null,
      showSearch: false,
    };
  },
  created() {
    this.setFilter = utilService.debounce(this.setFilter, 1000);
    // this.boards = this.getBoards;
    console.log(this.boards);
    // this.boardFilter = JSON.parse(JSON.stringify(this.board))
  },
  methods: {
    setFilter() {
      // this.$emit("filter", this.filterBy);
      this.showSearch = true;
    },
    goToTask(task) {
      this.filterBy.title = "";
      this.showSearch = false;
      this.$router.push(
        `/b/${task.boardId}/g/${task.groupId}/t/${task.taskId}`
      );
    },
  },
  computed: {
    filteredTasks() {
      let filteredBoards = [];
      console.log(this.boards);
      if (!this.filterBy.title) return;
      this.boards.forEach((board) => {
        board.groups.forEach((group) => {
          group.tasks.forEach((task) => {
            let isMatchTask = task.title
              .toLowerCase()
              .includes(this.filterBy.title.toLowerCase());
            if (isMatchTask) {
              let matchedTask = {};
              matchedTask.groupId = group.id;
              matchedTask.groupName = group.title;
              matchedTask.boardId = board._id;
              matchedTask.boardName = board.title;
              matchedTask.taskId = task.id;
              matchedTask.taskName = task.title;
              filteredBoards.push(matchedTask);
            }
          });
        });
      });
      return filteredBoards;
    },
    getBoards() {
      return this.$store.getters.boards;
    },
  },
};
</script>