<template>
  <div class="dynamic-attachment-edit">
     <button class="close" @click="closeModal">
       <span class="menu-header-close-button top-right"></span>
    </button>
    <div class="header-layout">
      <header>Attach from...</header>
    </div>
    <label title="Attach from computer">
      <span class="subtitle">Computer</span>
      <input type="file" @change="addAttachment" hidden />
    </label>
    <div class="add-link">
      <p class="title">Attach a link</p>
      <form @submit.prevent="addLinkAttachment">
        <input
          type="text"
          placeholder="Paste any link here..."
          v-model="attachmentLink"
          title="Attach link"
        />
        <button class="attach" title="Attach">Attach</button>
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