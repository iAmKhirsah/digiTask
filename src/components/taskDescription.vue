<template>
  <div class="task-description">
     <p>Description</p>
    <div v-click-outside="saveDesc" v-if="descEdit">
      
    <form  @submit="saveDesc">
      <textarea
       class="group-title"
        ref="desc"
        v-click-outside="saveDesc"
        oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
        onfocus='this.style.height = "";this.style.height = this.scrollHeight + "px"'
        v-model="updatedTask.description"
        maxlength="512"
        placeholder="Add a more detailed description..."
        
      />
      <button type="submit" class="task-description-save">Save</button>
      <button @click="clearDesc" class="task-description-close">X</button>
    </form>
  </div>
  
    <div v-else>
      <p @click="editDesc">{{ emptyDesc }}</p>
    </div>
  </div>
</template>
<script>
import vClickOutside from "v-click-outside";
export default {
  props: ["task", "descEdit"],
  name: "taskDescription",
  data() {
    return {
      updatedTask: "",
    };
  },
  created() {
    this.updatedTask = { ...this.task };
  },
  methods: {
    saveDesc() {
      this.$emit("saveEdit", { ...this.updatedTask });
    },
    clearDesc() {
      this.updatedTask = { ...this.task };
      this.$emit("closeDescEdit");
    },
    editDesc() {
      this.$emit("editDesc");
      this.$nextTick(() => {
          
          this.$refs.desc.focus();
        });
    },
  },
  computed: {
    emptyDesc() {
      return !this.updatedTask.description.match(/^\s*$/)
        ? this.updatedTask.description
        : "Add a more detailed description...";
    },
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
};
</script>