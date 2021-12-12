<template>
  <div class="the-search">
    <input
      type="text"
      v-model="filterBy.title"
      placeholder="Search"
      @input="setFilter"
    />
    <div class="filter-search-result" v-if="showSearch">
 
        <div class="search-res-container"  v-for="task in filteredTasks" :key="task.id" @click="goToTask(task)">
          <h3 class="search-task-name">{{ task.taskName }}</h3>
          <div class="search-content">
            <p>in</p>
            <h3>{{ task.groupName }}</h3>
            <span>on</span>
            <h3>{{ task.boardName }}</h3>
          </div>
        </div>
      </div>
    </div>

</template>
<script>
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
  created() {},
  methods: {
    setFilter() {
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