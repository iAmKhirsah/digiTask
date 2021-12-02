
<template>
  <header class="board-header" v-click-outside="setType">
    <div class="board-header-left">
      <div class="board-box">
        <input :style="inputWidth" v-model="board.title" />
      </div>
      <div class="board-box star" @click="toggleStar">
        <span v-if="!isStarred"><i class="far fa-star"></i></span>
        <span v-else><i class="fas fa-star"></i></span>
      </div>
      <div>
        <div v-for="(user, idx) in board.memebers" :key="idx" class="members">
          <span class="member"></span>
        </div>
        <div class="board-box invite" @click="setType('invite')">Invite</div>
      </div>
      <header-dynamic @closeModal="closeModal" :type="type" v-if="type"></header-dynamic>
    </div>
    <div class="board-header-right"></div>
  </header>
</template>


// need to fix the click outside of the invite dynamic header

<script>
import headerDynamic from "./headerDynamic.vue";
import vClickOutside from "v-click-outside";
export default {
  name: "boardHeader",
  props: ["board"],
  data() {
    return {
      isStarred: false,
      type: null,
    };
  },
  created() {},
  computed: {
    inputWidth() {
      return { width: this.board.title.length * 10 + 24 + "px" };
    },
  },
  methods: {
    toggleStar() {
      this.isStarred = !this.isStarred;
    },
    setType(type) {
      this.type = type;
    },
    closeModal() {
      this.setType('');
    },
  },
  components: {
    headerDynamic,
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
};
</script>