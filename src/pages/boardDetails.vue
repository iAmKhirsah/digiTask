<template>
  <div v-if="board" class="board-details-container" v-dragscroll:nochilddrag>
    <board-header :board="board" />
    <div class="group-list-container" @drop="onDrop($event)">
      <Draggable v-for="group in board.groups" :key="group.id">
        <group-list
          :group="group"
          @addTask="addTask"
          @updateGroup="updateGroup"
        />
      </Draggable>
      <div>
        <!-- v-on:keydown.enter="addGroup" -->
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
            <button class="add-task-btn">Add list</button>
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
import { Container, Draggable } from 'vue-smooth-dnd'

export default {
  name: "boardDetails",
  data() {
    return {
      board: null,
      isNewGroup: false,
      newGroup: {},
      newTask: {},
      scene:null
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
          this.newGroup.title = "";
          this.$refs.list.focus();
        });
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
    async addTask(task, groupId) {
      try {
        await this.$store.dispatch({ type: "addTask", task, groupId });
      } catch (err) {
        console.log("Couldnt add task", err);
      }
    },
     onColumnDrop (dropResult) {
      const scene = Object.assign({}, this.scene)
      scene.children = applyDrag(scene.children, dropResult)
      this.scene = scene
    },
    onCardDrop (columnId, dropResult) {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        const scene = Object.assign({}, this.scene)
        const column = scene.children.filter(p => p.id === columnId)[0]
        const columnIndex = scene.children.indexOf(column)
        const newColumn = Object.assign({}, column)
        newColumn.children = applyDrag(newColumn.children, dropResult)
        scene.children.splice(columnIndex, 1, newColumn)
        this.scene = scene
      }
    },
    getCardPayload (columnId) {
      return index => {
        return this.scene.children.filter(p => p.id === columnId)[0].children[index]
      }
    }
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
  components: { groupList, boardHeader,Container, Draggable },
  directives: {
    dragscroll,
    clickOutside: vClickOutside.directive,
  },
};
</script>