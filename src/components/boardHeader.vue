
<template>
  <section>
    <header class="board-header" v-click-outside="setType">
      <div class="board-header-left">
        <div class="board-box">
          <input
            :style="inputWidth"
            v-model="board.title"
            @focus="$event.target.select()"
          />
        </div>
        <div class="board-box star" @click="toggleStar">
          <span v-if="!isStarred"><i class="far fa-star"></i></span>
          <span v-else><i class="fas fa-star"></i></span>
        </div>
        <div v-for="member in board.members" :key="member._id" class="members">
          <span class="user-tag-name"
            ><img :src="member.imgUrl" class="image-settings"
          /></span>
        </div>
        <div>
          <div class="board-box invite" @click="setType('invite')">Invite</div>
        </div>
      </div>
      <div class="board-header-right">
        <div>*SHAWARMAWHEEL* Filter</div>
        <div>*** Show Menu</div>
      </div>
    </header>
    <header-dynamic
      @closeModal="closeModal"
      :type="type"
      v-if="type"
    ></header-dynamic>
  </section>
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
      this.setType("");
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