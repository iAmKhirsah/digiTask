<template>
  <section class="user-menu">
    <div>
      <button class="close" @click="closeModal">
        <span class="material-icons"> clear </span>
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

        <div class="menu-box">
          <div>Change background</div>
        </div>
        <!-- Ilia we need here another componenet? -->
        <!-- <background :board="board" @updateBoard="updateBoard" /> -->

        <div class="menu-box">
          <div class="labels">
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
  </section>
</template>
<script>
import background from "../components/background.vue";
export default {
  props: ["board"],
  data() {
    return {};
  },
  methods: {
    updateBoard(board) {},
  },
  components: {
    background,
  },
};
</script>