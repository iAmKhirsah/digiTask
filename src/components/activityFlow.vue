<template>
  <div>
    <div>
      <div>
        <p v-if="getActivities">
          <span>{{ getActivities.byMember.fullname }} </span>
          <span>{{ getActivities.txt }}</span> <span>of this card</span>
        </p>
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
      let idx = this.board.activities.findIndex(
        (activity) => activity.task.id === this.task.id
      );
      return this.board.activities[idx];
    },
    getComments() {
      let idx = this.group.tasks.findIndex((task) => task.id === this.task.id);
      return this.group.tasks[idx].comments;
    },
  },
};
</script>