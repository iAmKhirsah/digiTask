<template>
  <section class="task-details-overlay" v-if="pageOpen">
    <section class="task-details-wrapper">
      <div class="task-details-container" v-click-outside="closePage">
        <button @click="closePage">X</button>
        <div class="task-details-header">
          <h1>{{ getTask.title }}</h1>
          <p>in group {{ getGroup.title }}<span></span></p>
        </div>
        <div class="task-details-content-container">
          <div class="task-details-main-content">
            <task-description :task="getTask" @updatedTask="updatedTask" />
            <div class="task-details-activity">
              <p>Activity</p>
              <form @submit.prevent="sendMsg">
                <input type="text" placeholder="Write a comment..." />
              </form>
              <activity-flow
                :task="getTask"
                :group="getGroup"
                :board="getBoard"
              />
            </div>
          </div>
          <div class="task-details-sidebar">
            <p>Add to card</p>
            <div class="task-details-add-to-card">
              <div>Members</div>
              <div>Labels</div>
              <div>Checklist</div>
              <div>Dates</div>
              <div>Attachment</div>
              <div>Cover</div>
            </div>
            <p>Actions</p>
            <div class="task-details-actions">
              <div>Move</div>
              <div>Copy</div>
              <div><input type="checkbox" /> Watch</div>
              <div>Archive</div>
              <div>Share</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>
<script>
import vClickOutside from "v-click-outside";
import taskDescription from "../components/taskDescription.vue";
import activityFlow from "../components/activityFlow.vue";
export default {
  name: "taskDetails",
  data() {
    return {
      pageOpen: null,
    };
  },
  async created() {
    let groupId = this.$route.params.groupId;
    console.log(groupId);
    let taskId = this.$route.params.taskId;
    await this.$store.dispatch({ type: "getTaskDetails", taskId, groupId });
    this.pageOpen = true;
  },
  methods: {
    closePage() {
      this.$router.push(`/b/${this.$route.params.boardId}`);
    },
    updatedTask(updatedTask) {
      let group = this.getGroup;
      let idx = group.tasks.findIndex((task) => task.id === updatedTask.id);
      group.tasks[idx] = updatedTask;
      this.$store.dispatch({ type: "updateTask", task: updatedTask });
      this.$store.dispatch({ type: "updateGroup", group });
    },
  },
  computed: {
    getTask() {
      return { ...this.$store.getters.getCurrTask };
    },
    getGroup() {
      return { ...this.$store.getters.getCurrGroup };
    },
    getBoard() {
      return { ...this.$store.getters.getCurrBoard };
    },
  },
  components: {
    taskDescription,
    activityFlow,
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
};
</script>