<template>
  <div class="activity-content">
    <div>
      <div v-if="getActivities">
        <div
          class="activity-user-content"
          v-for="activity in getActivities"
          :key="activity.id"
        >
          <span class="user-tag-name in-header">
            <img class="image-settings" :src="activity.byMember.imgUrl"
          /></span>
          <strong> {{ activity.byMember.fullname }} </strong>
          <span> {{ activity.txt }}</span>
          <span>
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
</template>
<script>
export default {
  name: "activityFlow",
  props: ["task", "group", "board"],
  methods: {},
  computed: {
    getActivities() {
      if(!this.task) return this.getBoard.activities
      let activities = this.board.activities.filter(
        (activity) => activity.task.id === this.task.id
      );
      return activities;
    },
    getComments() {
      if(!this.task) return false
      return this.task.comments;
    },
    getBoard(){
      return this.$store.getters.getCurrBoard
    }
  },
};
</script>