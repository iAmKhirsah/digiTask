<template>
  <div v-if="board" class="board-details-container" v-dragscroll:nochilddrag>
    <board-header :board="board" />
    <div class="group-list-container">
      <div v-for="group in board.groups" :key="group.id">
        <group-list
          :group="group"
          @addTask="addTask"
          @updateGroup="updateGroup"
        />
      </div>
      <div>
        <form
          class="add-list-form"
          v-if="isNewGroup"
          @submit="addGroup"
          v-click-outside="toggleNewGroup"
        >
          <textarea
            class="textarea-another-list"
            ref="list"
            oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
            onfocus='this.style.height = "";this.style.height = this.scrollHeight + "px"'
            v-model="newGroup.title"
            maxlength="512"
          />
          <div class="add-list-form-btns">
            <button class="add-task-btn" type="submit">Add list</button>
            <button
              class="add-task-close-btn"
              type="button"
              @click="toggleNewGroup"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </form>

        <button v-else @click="toggleNewGroup" class="add-another-list">
          <i class="fas fa-plus"></i><span>Add another List</span>
        </button>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>
<script>
import groupList from "../components/groupList.vue";
import boardHeader from "../components/boardHeader.vue";
import { dragscroll } from "vue-dragscroll";
import vClickOutside from "v-click-outside";

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
    this.board = this.$store.getters.getCurrBoard;
  },
  methods: {
    async updateGroup(group) {
      await this.$store.dispatch({ type: "updateGroup", group });
    },
    toggleNewGroup() {
      this.isNewGroup = !this.isNewGroup;
      if (this.isNewGroup)
        this.$nextTick(() => {
          this.$refs.list.focus();
        });
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
  directives: {
    dragscroll,
    clickOutside: vClickOutside.directive,
  },
};
</script>