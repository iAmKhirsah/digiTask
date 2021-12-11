<template>
  <div>
    <div class="black-screen" @mousedown.stop.prevent="closeEditModal"></div>
    <div class="edit-modal-container">
      <div class="edit-modal-content">
        <!-- open card -->
        <div class="float-modal-tab" @click="editTask">
          <span class="icon-ms card-icon"></span>
          <span class="tab-title">Open card</span>
        </div>
        <!-- Edit labels -->
        <div class="float-modal-tab" @click="setType('labels')">
          <span class="icon-ms label-icon"></span>
          <span class="tab-title">Edit labels</span>
        </div>
        <!-- Change members -->
        <div class="float-modal-tab" @click="setType('members')">
          <span class="icon-ms member-icon"></span>
          <span class="tab-title">Change members</span>
        </div>
        <!-- Change cover -->
        <div class="float-modal-tab" @click="setType('cover')">
          <span class="icon-ms cover-icon"></span>
          <span class="tab-title">Change cover</span>
        </div>
        <!-- Copy -->
        <div class="float-modal-tab" @click="setType('copy')">
          <span class="icon-ms card-icon"></span>
          <span class="tab-title">Copy</span>
        </div>
        <!-- Edit dates -->
        <div class="float-modal-tab" @click="setType('dates')">
          <span class="icon-ms dates-icon"></span>
          <span class="tab-title">Edit dates</span>
        </div>
        <!-- Archive -->
        <div class="float-modal-tab" @click="setType('archive')">
          <span class="icon-ms archive-icon"></span>
          <span class="tab-title">Archive</span>
        </div>
      </div>
      <edit-dynamic
        :type="type"
        :board="getBoard"
        :getTask="task"
        :user="getUser"
        @createLabel="createLabel"
        @deleteLabel="deleteLabel"
        @updateTask="updateTask"
        @updateBoard="updateBoard"
        @taskActivity="taskActivity"
        @updateGroup="updateGroup"
        @deleteTask="deleteTask"
      />
    </div>
  </div>
</template>

<script>
import vClickOutside from "v-click-outside";
import editDynamic from "./editDynamic.vue";
export default {
  name: "editModal",
  props: ["task"],
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      type: "",
    };
  },
  created() {
    // console.log(this.task);
  },
  methods: {
    editTask() {
      this.closeEditModal();
      this.$emit("editTask", this.task.id);
    },
    closeEditModal() {
      this.$emit("closeEditModal");
    },
    setType(type) {
      this.type = type;
    },
    async deleteLabel(label) {
      await this.$store.dispatch({ type: "deleteLabel", label });
    },
    async createLabel(label) {
      await this.$store.dispatch({ type: "createLabel", label });
    },
    async updateTask(task) {
      await this.$store.dispatch({ type: "updateTask", task });
    },
    async deleteTask(task) {
      await this.$store.dispatch({ type: "removeTask", task });
    },
    async updateBoard(board) {
      await this.$store.dispatch({ type: "updateBoard", board });
    },
    async taskActivity(txt) {
      console.log(txt);
      let user = this.getUser;
      this.$store.dispatch({
        type: "addActivity",
        activity: { task: this.task, txt, user },
      });
    },
    async updateGroup(group) {
      await this.$store.dispatch({ type: "updateGroup", group });
    },
  },
  computed: {
    getTask() {
      return this.$store.getters.getTask;
    },
    getBoard() {
      return this.$store.getters.getCurrBoard;
    },
    getUser() {
      return this.$store.getters.currUser;
    },
  },
  components: {
    editDynamic,
  },
};
</script>

