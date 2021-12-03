<template>
  <div>
    <div>
      <div v-if="getActivities">
        <div v-for="activity in getActivities" :key="activity.id">
          <span>{{ activity.byMember.fullname }} </span>
          <span>{{ activity.txt }}</span> <span> this card</span>
          <img v-if="activity.imgUrl" :src="activity.imgUrl" />
        </div>
      </div>
      <div v-if="getComments">
        <p v-for="comment in getComments" :key="comment.id">
          <span><img :src="comment.byMember.imgUrl" alt="" /></span>
          <span>{{ comment.byMember.fullname }}: </span>
          <span>{{ comment.txt }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "activityFlow",
  props: ["task", "group", "board"],
  computed: {
    getActivities() {
      let activities = this.board.activities.filter(
        (activity) => activity.task.id === this.task.id
      );
      return activities;
    },
    getComments() {
      let idx = this.group.tasks.findIndex((task) => task.id === this.task.id);
      return this.group.tasks[idx].comments;
    },
  },
};
</script>