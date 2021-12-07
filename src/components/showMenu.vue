<template>
  <section class="user-menu open">
    <div v-if="!type">
   
        <button class="close" @click="closeShowMenu">
       <span class="menu-header-close-button"></span>
    </button>
      <div class="header-layout">
        <header>Menu</header>
      </div>
      <div class="menu-content">
        <div class="menu-box">
          <div>
            <div>About this board</div>
            <p>Add a description to your board</p>
          </div>
          <span class="icon-board"></span>
        </div>

        <div class="menu-box" @click="openModal('background')">
          <div>Change background</div>
        </div>
        <!-- Ilia we need here another componenet? -->
        <div class="menu-box">
          <div class="labels" @click="openModal('label')">
            <div>Labels</div>
            <span class="icon-board"></span>
          </div>
        </div>
        <div class="menu-box">
          <div>Close board...</div>
        </div>
        <div class="activity-container">
          <div class="menu-box">
            <div class="activity">
              <div class="activity-bold">Activity</div>
              <span class="icon-board"></span>
            </div>
          </div>
        </div>
        <!-- Ilya Activities Component -->
        <!-- <div class="menu-box">
          <div>Activities Component</div>
        </div> -->
      </div>
    </div>
    <background
      :board="board"
      @updateBoard="updateBoard"
      @goBack="goBack"
      @closeShowMenu="closeShowMenu"
      v-if="type === 'background'"
    />
  </section>
</template>
<script>
import background from "../components/background.vue";
export default {
  props: ["board"],
  data() {
    return {
      type: "",
    };
  },
  methods: {
    goBack() {
      this.type = "";
    },
    openModal(type) {
      this.type = type;
    },
    updateBoard(board) {
      this.$emit("updateBoard", board);
    },
    closeShowMenu() {
      this.$emit("closeShowMenu");
    },
  },
  computed: {},
  components: {
    background,
  },
};
</script>