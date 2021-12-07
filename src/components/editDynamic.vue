<template>
  <section class="dynamic-component-container" :class="type">
    <component
      :is="renderCmp"
      @closeModal="closeModal"
      :board="board"
      :task="task"
      :user="user"
      @attachment="attachment"
      @attachmentLink="attachmentLink"
      @openNewTask="openNewTask"
      @closeNewTask="closeNewTask"
      @openCopyGroup="openCopyGroup"
      @backToGroupEdit="backToGroupEdit"
      @deleteTask="deleteTask"
      @taskActivity="taskActivity"
      @openDelete="openDelete"
      @deleteGroup="deleteGroup"
      @updateBoard="updateBoard"
      v-click-outside="closeModal"
      @updateTask="updateTask"
      @createLabel="createLabel"
      @deleteLabel="deleteLabel"
    ></component>
  </section>
</template>
<script>
import members from "./dynamic_components/members.vue";
import checklist from "./dynamic_components/checklist.vue";
import labels from "./dynamic_components/labels.vue";
import dates from "./dynamic_components/dates.vue";
import attachment from "./dynamic_components/attachment.vue";
import cover from "./dynamic_components/cover.vue";
import move from "./dynamic_components/move.vue";
import archive from "./dynamic_components/archive.vue";
import share from "./dynamic_components/share.vue";
import groupEdit from "./dynamic_components/group-edit.vue";
import copy from './dynamic_components/copy.vue'
import vClickOutside from "v-click-outside";

export default {
  name: "editDynamic",
  props: ["type", "getBoard", "getTask", "group", "getUser"],
  data() {
    return {
      board: {},
      task: {},
      user: {},
    };
  },
  created() {
    this.board = this.getBoard;
    this.task = this.getTask;
    this.user = this.getUser;
  },
  computed: {
    renderCmp() {
      if (this.type === "members") return members;
      else if (this.type === "labels") return labels;
      else if (this.type === "checklist") return checklist;
      else if (this.type === "dates") return dates;
      else if (this.type === "attachment") return attachment;
      else if (this.type === "cover") return cover;
      else if (this.type === "move") return move;
      else if (this.type === 'copy') return copy
      else if (this.type === "archive") return archive;
      else if (this.type === "share") return share;
      else if (this.type === "groupEdit") return groupEdit;
      else if (this.type === "copyGroup") return copyGroup;
    },
  },
  components: {
    copy,
    members,
    labels,
    checklist,
    dates,
    attachment,
    cover,
    move,
    archive,
    share,
    groupEdit,
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    attachment(link) {
      this.$emit("attachment", link, this.task);
    },
    attachmentLink(link) {
      this.$emit("attachmentLink", link);
    },
    deleteTask() {
      this.$emit("deleteTask", this.task);
    },
    updateTask(task) {
      this.$emit("updateTask", task);
    },
    openNewTask() {
      this.$emit("newTaskOpen");
    },
    closeNewTask() {
      this.$emit("closeNewTask");
    },
    openCopyGroup() {
      this.$emit("openModal", "copyGroup");
    },
    backToGroupEdit() {
      this.$emit("openModal", "groupEdit");
    },
    openDelete() {
      this.$emit("openModal", "archive");
    },
    taskActivity(txt) {
      this.$emit("taskActivity", txt);
    },
    deleteGroup() {
      this.$emit("deleteGroup", this.group);
    },
    updateBoard(board){
      this.$emit('updateBoard', board)
    },
    createLabel(label) {
      this.$emit("createLabel", label);
    },
    deleteLabel(label) {
      this.$emit("deleteLabel", label);
    },
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
};
</script>