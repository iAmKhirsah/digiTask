<template>
  <section>
    <component :is="renderCmp"></component>
  </section>
</template>
<script>
import profile from "./dynamic_components/profile.vue";
import recent from "./dynamic_components/recent.vue";
import starred from "./dynamic_components/starred.vue";
import workSpace from "./dynamic_components/workSpace.vue";
export default {
  name: "headerDynamic",
  props: ["type"],
  data() {
    return {};
  },
  computed: {
    renderCmp() {
      if (this.type === "profile") return profile;
      if (this.type === "recent") return recent;
      if (this.type === "starred") return starred;
      if (this.type === "workSpace") return workSpace;
    },
  },
  components: {
    profile,
    recent,
    starred,
    workSpace,
  },
};
</script>