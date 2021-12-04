<template>
  <div class="task-addons-container" v-if="getTask">
    <div class="task-addons-members" v-if="getTask.members.length">
      <p>Members</p>
      <div v-for="member in getTask.members" :key="member._id">
        <img :src="member.imgUrl" :title="member.fullname" />
      </div>
    </div>
    <div class="task-addons-labels" v-if="getLabel.length">
      <p>Labels</p>
      <div v-for="label in getLabel" :key="label.id">
        <div :style="'background-color:' + label.color">
          <span v-if="label.title">{{ label.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "taskAddons",
  props: ["getTask", "getBoard"],
  computed: {
    getLabel() {
      let labels = [];
      this.getBoard.labels.forEach((label) => {
        let isLabel = this.getTask.labelIds.some(
          (taskLabelId) => label.id === taskLabelId
        );
        if (isLabel) {
          labels.push(label);
        }
      });
      return labels;
    },
  },
};
</script>