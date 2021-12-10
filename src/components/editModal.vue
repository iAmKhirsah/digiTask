<template>
  <div>
    <div class="black-screen" @mousedown.stop.prevent="closeEditModal"></div>
    <div class="edit-modal-container">
      <div class="edit-modal-content">
        <!-- open card -->
        <div class="float-modal-tab">
          <span class="icon-ms card-icon"></span>
          <span class="tab-title">Open card</span>
        </div>
        <!-- Edit labels -->
        <div class="float-modal-tab" @click="setType('labels')">
          <span class="icon-ms label-icon"></span>
          <span class="tab-title">Edit labels</span>
        </div>
        <!-- Change members -->
        <div class="float-modal-tab" @click="setType('members')">
          <span class="icon-ms member-icon"></span>
          <span class="tab-title">Change members</span>
        </div>
        <!-- Change cover -->
        <div class="float-modal-tab" @click="setType('cover')">
          <span class="icon-ms cover-icon"></span>
          <span class="tab-title">Change cover</span>
        </div>
        <!-- Copy -->
        <div class="float-modal-tab" @click="setType('copy')">
          <span class="icon-ms card-icon"></span>
          <span class="tab-title">Copy</span>
        </div>
        <!-- Edit dates -->
        <div class="float-modal-tab" @click="setType('dates')">
          <span class="icon-ms dates-icon"></span>
          <span class="tab-title">Edit dates</span>
        </div>
        <!-- Archive -->
        <div class="float-modal-tab" @click="setType('archive')">
          <span class="icon-ms archive-icon"></span>
          <span class="tab-title">Archive</span>
        </div>
      </div>
    </div>
    <edit-dynamic :type="type" />
  </div>
</template>

<script>
import vClickOutside from "v-click-outside";
// import members from "./dynamic_components/members.vue";
// import labels from "./dynamic_components/labels.vue";
// import dates from "./dynamic_components/dates.vue";
// import cover from "./dynamic_components/cover.vue";
// import archive from "./dynamic_components/archive.vue";
// import copy from "./dynamic_components/copy.vue";
import editDynamic from "./editDynamic.vue";
export default {
  name: "editModal",
  directives: {
    clickOutside: vClickOutside.directive,
  },
  data() {
    return {
      type: "",
    };
  },
  methods: {
    closeEditModal() {
      this.$emit("closeEditModal");
    },
    setType(type) {
      this.type = type;
    },
  },
  computed: {
    // renderCmp() {
    //   if (this.type === "members") return members;
    //   else if (this.type === "labels") return labels;
    //   else if (this.type === "dates") return dates;
    //   else if (this.type === "cover") return cover;
    //   else if (this.type === 'copy') return copy
    //   else if (this.type === "archive") return archive;
    // },
  },
  components: {
    editDynamic,
    // members,
    // labels,
    // dates,
    // cover,
    // archive,
    // copy,
  },
};
</script>

