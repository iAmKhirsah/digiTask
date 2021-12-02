<template>
  <div>
    <!-- <div>{{ getActivities }}</div> -->
  </div>
</template>
<script>
export default {
  name: "activityFlow",
  props: ["task", "group", "board"],
  computed: {
    getActivities() {
      console.log(this.board);
      let idx = this.board.activities.findIndex(
        (activity) => activity.task.id === this.task.id
      );
      return this.board.activities[idx];
    },
    getComments() {},
  },
};
</script>