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
      <ul v-for="label in board.labels" :key="label.id">
        <li :style="'background-color:' + label.color" @click="addLabel(label)">
          {{ label.title }} <span>Edit BUTTON GOES HERE</span>
        </li>
      </ul>
      <button class="create" @click="openCreateMenu">Create a new label</button>
    </div>
    <div class="dynamic-labels-edit" v-if="createMenu">
      <button class="close" @click="closeModal">
        <i class="fas fa-times"></i>
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
  props: ["board"],
  data() {
    return {
      newLabel: {
        title: "",
        selectedColor: "#ff9f1a",
      },
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
      this.$emit("addLabel", label);
    },
    openCreateMenu() {
      this.createMenu = true;
    },
    pickSelectedColor(color) {
      this.newLabel.selectedColor = color;
    },
    createLabel() {},
  },
};
</script>