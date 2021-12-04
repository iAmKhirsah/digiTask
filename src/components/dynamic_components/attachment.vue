<template>
  <div class="dynamic-attachment-edit">
    <button class="close" @click="closeModal"><i class="fas fa-times"></i></button>
    <div class="header-layout">
      <header>Attach from...</header>
    </div>
    <label>
      <span>Computer</span>
      <input type="file" @change="addAttachment" hidden />
    </label>
    <div class="add-link">
      <p  class="title">Attach a link</p>
      <p>PLACEHOLDER FIX THIS @BENY</p>
      <form @submit.prevent="addAttachment">
        <input
          type="text"
          placeholder="Paste any link here..."
          v-model="attachment"
        />
        <button class="attach">Attach</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "attachment",
  data() {
    return {
      attachment: "",
    };
  },
  methods: {
    addAttachment(ev) {
      if (ev) {
        this.$emit("attachment", ev);
      } else this.$emit("attachment", this.attachment);
    },
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>