<template>
  <div class="dynamic-attachment-edit">
     <button class="close" @click="closeModal">
       <span class="menu-header-close-button"></span>
    </button>
    <div class="header-layout">
      <header>Attach from...</header>
    </div>
    <label>
      <span>Computer</span>
      <input type="file" @change="addAttachment" hidden />
    </label>
    <div class="add-link">
      <p class="title">Attach a link</p>
      <form @submit.prevent="addLinkAttachment">
        <input
          type="text"
          placeholder="Paste any link here..."
          v-model="attachmentLink"
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
      attachmentLink: "",
    };
  },
  methods: {
    addAttachment(ev) {
      this.$emit("attachment", ev);
    },
    addLinkAttachment() {
      this.$emit("attachmentLink", this.attachmentLink);
    },
    closeModal() {
      this.$emit("closeModal");
    },
  },
};
</script>