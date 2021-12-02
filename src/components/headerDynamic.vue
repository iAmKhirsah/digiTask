<template>
  <section>
    <component :is="renderCmp" @closeModal="closeModal"></component>
  </section>
</template>
<script>
import profile from "./dynamic_components/profile.vue";
import recent from "./dynamic_components/recent.vue";
import starred from "./dynamic_components/starred.vue";
import workSpace from "./dynamic_components/workSpace.vue";
import invite from "./dynamic_components/invite.vue";
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
      if (this.type === "invite") return invite;
    },
  },
  components: {
    profile,
    recent,
    starred,
    workSpace,
  },
  methods:{
    closeModal(){
      this.$emit('closeModal')
    }
  }
<<<<<<< HEAD
=======

>>>>>>> ba0a62cb2864426885581ea39b486d97a2262219
};
</script>