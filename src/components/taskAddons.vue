<template>
  <div class="task-addons-container" v-if="getTask">
    <div class="task-addons-content-container">
      <div class="task-addons-members" v-if="getTask.members.length">
        <p class="subtitles">Members</p>
        <div class="task-addons-members-info">
          <div v-for="member in getTask.members" :key="member._id">
            <span class="user-tag-name in-header">
              <img
                class="image-settings"
                :src="member.imgUrl"
                :title="member.fullname"
              />
            </span>
          </div>
        </div>
      </div>
      <div class="task-addons-labels" v-if="getLabel.length">
        <p class="subtitles">Labels</p>
        <div class="task-addons-labels-cards" v-for="label in getLabel" :key="label.id">
          <div :style="'background-color:' + label.color">
            <span v-if="label.title">{{ label.title }}</span>
          </div>
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