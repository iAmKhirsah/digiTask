<template>
  <div v-if="board" class="board-details-container" v-dragscroll:nochilddrag>
    <board-header :board="board" />
    <div class="group-list-container">
      <Container
        drag-class="card-ghost"
        drop-class="card-ghost-drop"
        orientation="horizontal"
         drag-handle-selector=".draggable-item"
     
        :get-child-payload="getChildPayload"
        :drop-placeholder="dropPlaceholderOptions"
        @drop="onDropGroup"
      >
        <Draggable v-for="(group, idx) in board.groups" :key="idx">
          <group-list
            class="draggable-item"
            :group="group"
            :idx="idx"
            @addTask="addTask"
            @updateGroup="updateGroup"
            @onDrop="onDrop"
            @deleteGroup="deleteGroup"
            @miniPreview="miniPreview"
            :isMiniPreview="isMiniPreview"
            :board="board"
          />
        </Draggable>
      </Container>

      <div>
        <form
          class="add-list-form"
          v-if="isNewGroup"
          v-on:keydown.enter="addGroup"
          v-click-outside="toggleNewGroup"
        >
          <textarea
            class="textarea-another-list"
            ref="list"
            @keydown.enter.prevent
            oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
            onfocus='this.style.height = "";this.style.height = this.scrollHeight + "px"'
            v-model="newGroup.title"
            maxlength="512"
            placeholder="Enter list title..."
          />
          <div class="add-list-form-btns">
            <button class="add-task-btn" @click="addGroup">Add list</button>
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
           <span class="material-icons"> add </span><span class="title">Add another List</span>
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
import { Container, Draggable } from "vue-smooth-dnd";

export default {
  name: "boardDetails",
  data() {
    return {
      board: null,
      isNewGroup: false,
      newGroup: {},
      isMiniPreview:false,
      newTask: {},
      dropPlaceholderOptions: {
        className: "drop-preview",
        animationDuration: "150",
        showOnTop: false,
      },
    };
  },
  async created() {
    this.newGroup = { ...this.$store.getters.getEmptyGroup };
    this.newTask = { ...this.$store.getters.getEmptyTask };
    let boardId = this.$route.params.boardId;
    await this.$store.dispatch({ type: "loadAndWatchBoard", boardId });
    this.board = { ...this.$store.getters.getCurrBoard };
    if (!this.board) this.$router.push("/");
    if (!this.board.groups.length) return;
    this.board.groups.reduce((acc, group) => {
      if (!group.data) group.data = "Draggable" + acc;
      if (!group.tasks.length) return;
      group.tasks.reduce((acc1, task) => {
        if (!task.data) return;
        task.data = "Draggable" + task.id + acc1;
        return ++acc1;
      }, 100);
      return ++acc;
    }, 1);
    console.log(this.board.groups);
  },
  methods: {
    async updateGroup(group) {
      await this.$store.dispatch({ type: "updateGroup", group });
    },
    toggleNewGroup() {
      this.isNewGroup = !this.isNewGroup;
      if (this.isNewGroup)
        this.$nextTick(() => {
          this.newGroup.title = "";
          this.$refs.list.focus();
        });
    },
      miniPreview(){
      this.isMiniPreview = !this.isMiniPreview
    },

    async addGroup() {
      try {
        if (this.newGroup.title.match(/^\s*$/) || !this.newGroup.title.length) {
          this.newGroup.title = "";
          this.$nextTick(() => {
            this.$refs.list.focus();
          });
          return;
        }

        let group = { ...this.newGroup };

        await this.$store.dispatch({ type: "addGroup", group });
        this.newGroup = { ...this.$store.getters.getEmptyGroup };
        this.newGroup.title;
      } catch (err) {
        console.log("Couldnt add group", group);
      }
    },
    async deleteGroup(group) {
      try {
        console.log(group);
        let groupId = group.id;
        await this.$store.dispatch({ type: "removeGroup", groupId });
      } catch (err) {}
    },
    async addTask(task, groupId) {
      let user = { ...this.$store.getters.currUser };
      try {
        await this.$store.dispatch({
          type: "addTask",
          taskRaw: { task, groupId, user },
        });
      } catch (err) {
        console.log("Couldnt add task", err);
      }
    },
    async onDrop(groupIdx, dropResult) {
      try {
        console.log(this.board);
        this.board = this.applyDrag(this.board.groups[groupIdx], dropResult);
        let board = { ...this.board };
        await this.$store.dispatch({ type: "updateBoard", board });
      } catch (err) {
        console.log("Couldnt drag group", err);
      }
    },
    async onDropGroup(dropResult) {
      try {
        this.board.groups = this.applyDrag(this.board.groups, dropResult);
        let board = { ...this.board };
        await this.$store.dispatch({ type: "updateBoard", board });
      } catch (err) {
        console.log("Couldnt drag group", err);
      }
    },
    applyDrag(arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult;
      console.log(removedIndex, addedIndex, payload);
      if (removedIndex === null && addedIndex === null) return arr;

      const result = [...arr];
      let itemToAdd = payload;

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }

      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }

      return result;
    },
    getChildPayload(groupIndex, itemIndex) {
      return this.board.groups[groupIndex].tasks[itemIndex];
    },
  },
  computed: {},
  mounted() {
    if (this.$refs.list) {
      this.$nextTick(() => {
        this.$refs.list.focus();
      });
      this.$nextTick(() => {
        this.$refs.list.blur();
      });
    }
  },
  components: { groupList, boardHeader, Container, Draggable },
  directives: {
    dragscroll,
    clickOutside: vClickOutside.directive,
  },
};
</script>