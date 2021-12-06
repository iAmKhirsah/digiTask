<template>
  <div class="task-label-preview-container" v-if="hasLabels">
    <div
      v-for="label in taskLabels"
      :key="label.id"
      class="task-labels-container"
      @click.capture="miniPreview"
    >
      <!-- <transition name="fade" mode="out-in"> -->
      <div
        class="label-preview"
        :class="labelMini"
        :style="{ background: label.color }"
      >
      <transition name="fade" >  <span class="label-preview" v-if="!isMiniPreview"> <span class="label-title">{{ label.title }} </span> </span></transition> 
      </div>
      <!-- <div   class="label-preview" v-else :style="{ background: label.color , ':hover-opacity':0.3}">{{label.title}}</div> -->
      <!-- </transition> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "taskLabelPreview",
  props: ["task", "board", "isMiniPreview"],
  data() {
    return {};
  },
  methods: {
    miniPreview() {
      this.$emit("miniPreview");
    },
    editTask(taskId) {
      this.$emit("editTask", taskId);
    },
  },
  computed: {
    hasLabels() {
      return this.task.labelIds.length;
    },
    taskLabels() {
      let labels = [];
      this.task.labelIds.forEach((labelId) => {
        this.board.labels.forEach((label) => {
          if (label.id === labelId) labels.push(label);
        });
      });
      console.log(labels);
      return labels;
    },
    labelMini() {
      return { mini: this.isMiniPreview };
    },
    backgroundColor() {},
  },
};
</script>