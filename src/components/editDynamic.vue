<template>
  <section>
    <component
      :is="renderCmp"
      @closeModal="closeModal"
      :board="board"
      :task="task"
      @attachment="attachment"
      @openNewTask="openNewTask"
      @closeNewTask="closeNewTask"
      @openCopyGroup="openCopyGroup"
      @backToGroupEdit="backToGroupEdit"
      @deleteTask="deleteTask"
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

export default {
  name: "editDynamic",
  props: ["type", "getBoard", "getTask"],
  data() {
    return {
      board: {},
      task: {},
    };
  },
  created() {
    this.board = this.getBoard;
    this.task = this.getTask;
  },
  computed: {
    renderCmp() {
      if (this.type === "members") return members;
      if (this.type === "labels") return labels;
      if (this.type === "checklist") return checklist;
      if (this.type === "dates") return dates;
      if (this.type === "attachment") return attachment;
      if (this.type === "cover") return cover;
      if (this.type === "move") return move;
      if (this.type === "archive") return archive;
      if (this.type === "share") return share;
      if (this.type === "groupEdit") return groupEdit;
      if (this.type === "copyGroup") return copyGroup;
    },
  },
  components: {
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
    deleteTask() {
      this.$emit("deleteTask", this.task);
    },
    openNewTask() {
      this.$emit("newTaskOpen");
    },
    closeNewTask() {
      this.$emit("closeNewTask");
    },
    openCopyGroup() {
      this.type = "copyGroup";
    },
    backToGroupEdit() {
      this.type = "groupEdit";
    },
  },
};
</script>