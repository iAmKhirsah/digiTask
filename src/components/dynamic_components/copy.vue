<template>
  <div>
    <button @click="closeModal">
      <span class="material-icons"> clear </span>
    </button>
    <p>Copy card</p>
    <div>
      <form @submit.prevent="addNewCopy"></form>
      <p>Title</p>
      <textarea type="text" v-model="taskToCopy.title"></textarea>
    </div>
    <div>
      <p>Copy to...</p>
      <label>List</label>
      <select @change="setCopyTo">
        <option
          v-for="group in updateBoard.groups"
          :key="group.id"
          :value="group.id"
        >
          {{ group.title }}
        </option>
      </select>
    </div>
    <button @click="addNewCopy">Create card</button>
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
    this.updateBoard = JSON.parse(JSON.stringify(this.board));
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
      group.tasks.push(this.taskToCopy);
      this.$emit("updateGroup", JSON.parse(JSON.stringify(group)));
    },
    closeModal() {
      this.$emit("closeModal");
    },
  },
  computed: {},
};
</script>