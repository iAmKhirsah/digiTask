<template>
  <div>
    <div class="dynamic-labels-edit " :class="{'on-menu' : isBoardLabels }" v-if="!createMenu">
      <button class="close icon-sm" @click="closeModal">
        <span class="menu-header-close-button"></span>
      </button>
      <div class="header-back-button" @click="goBack">
        <span class="menu-header-back-button"></span>
      </div>
      <div class="header-layout">
        <header>Labels</header>
      </div>

      <input type="text" placeholder="Search labels..." v-model="filterBy" />

      <div class="label-list-content">
        <h5 class="subtitle">Labels</h5>
        <div class="label-list-container">
          <ul
            v-for="label in filterLabels"
            :key="label.id"
            class="label-color-ul"
          >
            <li
              :style="'background-color:' + label.color"
              @click="addLabel(label)"
              class="label-list-color"
            >
              <div class="label-list-title">
                <span>
                  {{ label.title }}
                </span>
              </div>
            </li>
            <div>
              <button
                class="label-edit-button"
                @click="
                  labelToEdit(label);
                  openCreateMenu();
                "
              >
                <span class="icon-sm icon-pencil"> </span>
              </button>
            </div>
          </ul>
        </div>
      </div>
      <button class="create" @click="openCreateMenu">Create a new label</button>
    </div>
    <div class="dynamic-labels-edit" :class="{'on-menu' : isBoardLabels }" v-if="createMenu">
      <!-- <button class="close" @click="closeModal">
        <span class="material-icons"> clear </span>
      </button> -->
      <button class="icon-sm close" @click="closeModal">
        <span class="menu-header-close-button"></span>
      </button>
      <button @click="closeCreateMenu" class="back icon-sm">
        <span class="menu-header-back-button"></span>
      </button>
      <div class="header-layout">
        <header>{{ createUpdateTitle }}</header>
      </div>
      <div>
        <p class="subtitle">Name</p>
        <form @submit="createLabel">
          <input type="text" v-model="newLabel.title" v-if="!labelToUpdate" />
          <input
            type="text"
            v-model="labelToUpdate.title"
            v-if="labelToUpdate"
          />
        </form>
      </div>
      <p class="subtitle">Select a color</p>
      <div>
        <div class="dynamic-labels-color-container">
          <div v-for="(color, idx) in colors" :key="idx">
            <span
              :style="{
                'background-color': color,
              }"
              class="dynamic-labels-color-card"
              @click="pickSelectedColor(color)"
              ><span class="icon-settings icon-sm v-sign"></span
            ></span>
          </div>
        </div>
      </div>

      <button
        class="create-label-btn"
        @click="createLabel('create')"
        v-if="!labelToUpdate"
      >
        Create
      </button>
      <button @click="createLabel('update')" v-if="labelToUpdate">Save</button>
      <button @click="deleteLabel" v-if="labelToUpdate">Delete</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "labels",
  props: ["board", "task", "isBoardLabels"],
  data() {
    return {
      updatedTask: null,
      // updatedTask: this.task,
      newLabel: {
        title: "",
        selectedColor: "#ff9f1a",
      },
      filterBy: "",
      labelToUpdate: null,
      selectedLabel: "",
      selectedColor: "",
      colors: [
        "#61bd4f",
        "#f2d600",
        "#ff9f1a",
        "#eb5a46",
        "#c377e0",
        "#0079bf",
        "#00c2e0",
        "#51e898",
        "#ff78cb",
        "#344563",
        "#b3bac5",
      ],
      createMenu: false,
    };
  },
  created() {
    if (this.task) this.updatedTask = JSON.parse(JSON.stringify(this.task));
    this.$store.commit({type:'updateTask',task:this.updatedTask})
  },
  computed: {
    createOrUpdate() {
      return this.labelToUpdate
        ? this.selectedColor
        : this.newLabel.selectedColor;
    },
    createUpdateTitle() {
      return this.labelToUpdate ? "Change label" : "Create label";
    },
    getBoard() {
      return this.$store.getters.getCurrBoard;
    },
    filterLabels() {
      if (!this.filterBy) return this.getBoard.labels;
      let filteredLabels = this.getBoard.labels.filter((label) => {
        return label.title.toLowerCase().includes(this.filterBy.toLowerCase());
      });
      return filteredLabels;
    },
    getCurrTask(){
      return this.$store.getters.getCurrTask
    }
  },
  methods: {
    goBack() {
      this.$emit("goBack");
    },
    closeModal() {
      this.$emit("closeModal");
      this.labelToUpdate = null;
    },
    deleteLabel() {
      this.$emit("deleteLabel", this.labelToUpdate);
      this.labelToUpdate = null;
      this.createMenu = false;
    },
    labelToEdit(label) {
      this.labelToUpdate = JSON.parse(JSON.stringify(label));
      this.selectedColor = this.labelToUpdate.color;
    },
    addLabel(label) {
      let task = JSON.parse(JSON.stringify(this.updatedTask));
      if (this.isBoardLabels) {
        this.labelToEdit(label);
        return;
      }
      let idx = task.labelIds.indexOf(label.id);
      if (idx > -1) task.labelIds.splice(idx, 1);
      else task.labelIds.push(label.id);
      this.updatedTask = task
      this.$emit("updateTask", task);
    },
    openCreateMenu() {
      this.createMenu = true;
    },
    closeCreateMenu() {
      this.createMenu = false;
      this.labelToUpdate = null;
    },
    pickSelectedColor(color) {
      this.newLabel.selectedColor = color;
      if (this.labelToUpdate) {
        this.labelToUpdate.color = color;
      }
    },
    createLabel(type = "") {
      if (type === "create") {
        this.$emit("createLabel", this.newLabel);
        this.newLabel.title = "";
        this.newLabel.selectedColor = "#ff9f1a";
      } else this.$emit("createLabel", this.labelToUpdate);
      this.selectedColor = "";
      this.labelToUpdate = null;
      this.createMenu = false;
    },
  },
};
</script>