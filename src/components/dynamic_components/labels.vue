<template>
  <div>
    <div class="dynamic-labels-edit" v-if="!createMenu">
      <button class="close" @click="closeModal">
        <i class="fas fa-times"></i>
      </button>
      <div class="header-layout">
        <header>Labels</header>
      </div>
      <input type="text" placeholder="Search labels..." />
      <div class="label-list-container">
        <ul v-for="label in board.labels" :key="label.id">
          <li
            :style="'background-color:' + label.color"
            @click="addLabel(label)"
            class="label-list-color"
          >
            <span>
              {{ label.title }}
            </span>
            <!-- <span>Edit BUTTON GOES HERE</span> -->
          </li>
        </ul>
      </div>
      <button class="create" @click="openCreateMenu">Create a new label</button>
    </div>
    <div class="dynamic-labels-edit" v-if="createMenu">
      <button class="close" @click="closeModal">
        <i class="fas fa-times"></i>
      </button>
      <button @click="createMenu = false">
        <i class="fas fa-chevron-left"></i>
      </button>
      <div class="header-layout">
        <header>Create label</header>
      </div>
      <div>
        <p>Name</p>
        <form @submit="createLabel">
          <input type="text" v-model="newLabel.title" />
        </form>
      </div>
      <div>
        <p>Select a color</p>
        <div class="dynamic-labels-color-container">
          <div v-for="(color, idx) in colors" :key="idx">
            <span
              :style="'background-color:' + color"
              class="dynamic-labels-color-card"
              @click="pickSelectedColor(color)"
              ><i
                class="fas fa-check"
                v-if="newLabel.selectedColor === color"
              ></i
            ></span>
          </div>
        </div>
        <button @click="createLabel">Create</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "labels",
  props: ["board", "task"],
  data() {
    return {
      updatedTask: JSON.parse(JSON.stringify(this.task)),
      newLabel: {
        title: "",
        selectedColor: "#ff9f1a",
      },
      selectedLabel: "",
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
  computed: {},
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    addLabel(label) {
      console.log(this.task);
      let idx = this.updatedTask.labelIds.indexOf(label.id);
      if (idx > -1) this.updatedTask.labelIds.splice(idx, 1);
      else this.updatedTask.labelIds.push(label.id);
      this.$emit("updateTask", this.updatedTask);
    },
    openCreateMenu() {
      this.createMenu = true;
    },
    pickSelectedColor(color) {
      this.newLabel.selectedColor = color;
    },
    createLabel() {
      this.$emit("createLabel", this.newLabel);
      this.newLabel.title = "";
      this.createMenu = false;
    },
  },
};
</script>