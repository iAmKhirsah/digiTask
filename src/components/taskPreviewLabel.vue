<template>
  <div class="task-label-preview-container" v-if="hasLabels">
    <div
      v-for="label in taskLabels"
      :key="label.id"
      class="task-labels-container"
    >
    <div class="label-preview mini" v-if="isMiniPreview" :style="{background:label.color}"></div>
      <div class="label-preview" v-else :style="{ background: label.color }">{{label.title}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "taskLabelPreview",
  props: ["task", "board","isMiniPreview"],
  data(){
      return {
          
      }
  },
  methods: {
      miniPreview(){
          this.$emit("miniPreview")
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
    labelTitle(){

    },
    backgroundColor() {},
  },
};
</script>