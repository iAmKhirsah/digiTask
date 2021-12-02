<template>
  <section class="task-details-overlay" v-if="pageOpen">
    <section class="task-details-wrapper">
      <div class="task-details-container" v-click-outside="closePage">
        <button @click="closePage">X</button>
        <div class="task-details-header">
          <p>Task.title placeholder</p>
          <p>in group GROUP NAME PLACEHOLDER</p>
        </div>
        <div class="task-details-content-container">
          <div class="task-details-main-content">
            <div class="task-details-description">
              <p>Description</p>
              <form @submit.prevent="saveDesc"></form>
              <textarea></textarea>
              <button>Save</button>
              <button>X</button>
            </div>
            <div class="task-details-activity">
              <p>Activity</p>
              <form @submit.prevent="sendMsg">
                <input type="text" placeholder="Write a comment..." />
              </form>
              <div>COMMENTS AND ACTIVITIES GO HERE</div>
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
export default {
  name: "taskDetails",
  data() {
    return {
      pageOpen: null,
    };
  },
  created() {
    console.log(this.$route.params.taskId);
    this.pageOpen = true;
  },
  methods: {
    closePage() {
      this.pageOpen = false;
    },
  },
  computed: {},
  directives: {
    clickOutside: vClickOutside.directive,
  },
};
</script>