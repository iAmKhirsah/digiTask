<template>
  <div class="dynamic-copy-edit">
    <button class="close" @click="closeModal">
      <span class="menu-header-close-button"></span>
    </button>
    <header>Copy card</header>
    <div>
      <form @submit.prevent="addNewCopy"></form>
      <p class="subtitle">Title</p>
      <textarea type="text" v-model="taskToCopy.title"></textarea>
    </div>
    <div>
      <p class="subtitle">Copy to...</p>
      <div class="copy-to">
        <label class="label-title">List</label>

        <select class="select-settings" @change="setCopyTo">
          <option
            v-for="group in updateBoard.groups"
            :key="group.id"
            :value="group.id"
          >
            {{ group.title }}
          </option>
        </select>
      </div>
    </div>
    <button @click="addNewCopy" class="create-copy-btn">Create card</button>
  </div>
</template>
<script>
import { utilService } from "../../services/utilService";
export default {
  name: "copy",
  props: ["task", "board"],
  data() {
    return {
      groupId: null,
      updateBoard: null,
      taskToCopy: null,
    };
  },
  created() {
    this.updateBoard = JSON.parse(JSON.stringify(this.getBoard));
    this.taskToCopy = JSON.parse(JSON.stringify(this.task));
  },
  methods: {
    setCopyTo(ev) {
      this.groupId = ev.target.value;
    },
    addNewCopy() {
      let idx = this.updateBoard.groups.findIndex(
        (group) => group.id === this.groupId
      );
      this.taskToCopy.id = "t" + utilService.makeId();
      let group = this.updateBoard.groups[idx];
      console.log(this.updateBoard);
      group.tasks.push(this.taskToCopy);
      this.$emit("updateGroup", JSON.parse(JSON.stringify(group)));
    },
    closeModal() {
      this.$emit("closeModal");
    },
  },
  computed: {
    getBoard() {
      return this.$store.getters.getCurrBoard;
    },
  },
};
</script>