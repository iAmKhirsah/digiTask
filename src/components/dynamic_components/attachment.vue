<template>
  <div class="dynamic-attachment-edit card-layout nav-modal">
    <button><i class="fas fa-times"></i></button>
    <div class="header-layout">
      <header>Attach from...</header>
    </div>
    <label>
      <span>Computer</span>
      <input type="file" @change="addAttachment" hidden />
    </label>
    <div>
      <p>Attach a link</p>
      <p>PLACEHOLDER FIX THIS @BENY</p>
      <form @submit.prevent="addAttachment">
        <input
          type="text"
          placeholder="Paste any link here..."
          v-model="attachment"
        />
        <button>Attach</button>
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
  },
};
</script>