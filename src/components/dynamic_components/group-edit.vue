<template>
  <section class="dynamic-group-edit card-layout nav-modal">
    <div v-if="type !== 'openDelete'">
      <button class="close" @click="closeModal">
        <span class="material-icons"> clear </span>
      </button>
      <div class="header-layout">
        <header>List ations</header>
      </div>
      <div >
        <p @click="openNewTask">Add card...</p>
        <p @click="openCopyGroup">Copy list...</p>
        <div class="card-line"></div>
        <p>Sort by...</p>
        <div class="card-line"></div>
        <p @click="openDelete">Delete...</p>
      </div>
      
    </div>
    <div v-else class="checked">
        <archive
          @deleteGroup="deleteGroup"
          @closeModal="closeModal"
          :isGroup="true"
        />
      </div>
  </section>
</template>
<script>
import addTask from "../addTask.vue";
import archive from "./archive.vue";

export default {
  name: "group-edit",
  data() {
    return {
      type: "",
    };
  },

  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    openNewTask() {
      this.$emit("openNewTask");
      this.closeModal();
    },
    closeNewTask() {
      this.$emit("closeNewTask");
    },
    openCopyGroup() {
      this.type = "copyGroup";
    },
    openDelete() {
      this.type = "openDelete";
    },
    deleteGroup() {
      this.$emit("deleteGroup");
    },
  },
  components: {
    addTask,
    archive,
  },
};
</script>