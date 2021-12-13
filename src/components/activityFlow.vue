<template>
  <div class="activity-content">
    <div>

      <div v-if="getActivities" class="activity-content-container">

        <div
          class="activity-user-content"
          v-for="activity in getActivities"
          :key="activity.id"
        >
          <div class="activity-user-info">
            <span class="user-tag-name in-header">
              <img
                v-if="activity.byMember.imgUrl"
                class="image-settings"
                :src="activity.byMember.imgUrl"
            /></span>
            <div class="activity-user-info-content">
              <span>
                <strong> {{ activity.byMember.fullname }} </strong>
                {{ activity.txt }}
              </span>
            </div>
          </div>
          <span class="image-container">
            <img
              v-if="activity.imgUrl"
              :src="activity.imgUrl"
              class="activity-attachment-image"
            />
          </span>
        </div>

        

        <div v-if="getComments">
          <div
            class="activity-user-content"
            v-for="comment in getComments"
            :key="comment.id"
          >
          <div class="activity-user-info">
            <span class="user-tag-name in-header"
              ><img
                class="image-settings"
                :src="comment.byMember.imgUrl"
                alt=""
            /></span>
            <span>
              <strong>{{ comment.byMember.fullname }} </strong></span
            >
            <span>{{ comment.txt }}</span>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "activityFlow",
  props: ["task", "group", "board"],
  methods: {},
  computed: {
    getActivities() {
      if (!this.task) return this.getBoard.activities;
      let activities = this.getBoard.activities.filter(
        (activity) => activity.task.id === this.task.id
      );
      return activities;
    },
    getComments() {
      if (!this.task) return false;
      return this.task.comments;
    },
    getBoard() {
      return this.$store.getters.getCurrBoard;
    },
  },
};
</script>