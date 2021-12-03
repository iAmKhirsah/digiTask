<template>
  <section class="task-details-overlay" v-if="pageOpen">
    <section class="task-details-wrapper">
      <div class="task-details-container" v-click-outside="closePage">
        <button @click="closePage" class="task-details-close">X</button>
        <div class="task-details-header">
          <textarea v-model="getTask.title"></textarea>
          <p>in group {{ getGroup.title }}<span></span></p>
        </div>
        <div class="task-details-addons">
          ADDED MEMBERS GO HERE, ADDED LABELS GO HERE
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
            <div class="task-details-sidebar-btns">
              <h3>Add to card</h3>
              <div
                @click="setType('members')"
                class="task-details-sidebar-button"
              >
                <span class="td-sidebar-icon"
                  ><img src="../assets/icons/avatar.png"
                /></span>
                <span class="td-sidebar-text">Members</span>
              </div>
              <div
                @click="setType('labels')"
                class="task-details-sidebar-button"
              >
                <span class="td-sidebar-icon"></span>
                <span class="td-sidebar-text">Labels</span>
              </div>
              <div
                @click="setType('checklist')"
                class="task-details-sidebar-button"
              >
                <span class="td-sidebar-icon"></span>
                <span class="td-sidebar-text">Checklist</span>
              </div>
              <div
                @click="setType('dates')"
                class="task-details-sidebar-button"
              >
                <span class="td-sidebar-icon"
                  ><img src="../assets/icons/time.png"
                /></span>
                <span class="td-sidebar-text">Dates</span>
              </div>
              <div
                @click="setType('attachment')"
                class="task-details-sidebar-button"
              >
                <span class="td-sidebar-icon"
                  ><img src="../assets/icons/attachment.png"
                /></span>
                <span class="td-sidebar-text">Attachment</span>
              </div>
              <div
                @click="setType('cover')"
                class="task-details-sidebar-button"
              >
                <span class="td-sidebar-icon"></span>
                <span class="td-sidebar-text">Cover</span>
              </div>
            </div>
            <div class="task-details-sidebar-btns">
              <h3>Actions</h3>
              <div @click="setType('move')" class="task-details-sidebar-button">
                <span class="td-sidebar-icon"
                  ><i class="fas fa-arrow-right"></i
                ></span>
                <span class="td-sidebar-text">Move</span>
              </div>
              <div class="task-details-sidebar-button">
                <span class="td-sidebar-icon"
                  ><img src="../assets/icons/copy.png"
                /></span>
                <span class="td-sidebar-text">Copy</span>
              </div>
              <div class="task-details-sidebar-button">
                <span class="td-sidebar-icon"
                  ><img src="../assets/icons/watch.png"
                /></span>
                <span class="td-sidebar-text">Watch</span
                ><input type="checkbox" />
              </div>
              <div
                @click="setType('archive')"
                class="task-details-sidebar-button"
              >
                <span class="td-sidebar-icon"></span>
                <span class="td-sidebar-text">Archive</span>
              </div>
              <div
                @click="setType('share')"
                class="task-details-sidebar-button"
              >
                <span class="td-sidebar-icon"
                  ><img src="../assets/icons/share.png"
                /></span>
                <span class="td-sidebar-text">Share</span>
              </div>
            </div>
          </div>
        </div>
        <edit-dynamic
          :type="type"
          v-if="type"
          :getBoard="getBoard"
          :getTask="getTask"
          @attachment="attachment"
          @deleteTask="deleteTask"
        />
      </div>
    </section>
  </section>
</template>
<script>
import vClickOutside from "v-click-outside";
import taskDescription from "../components/taskDescription.vue";
import activityFlow from "../components/activityFlow.vue";
import editDynamic from "../components/editDynamic.vue";
import { uploadFile } from "../services/serverlessUploadService";
export default {
  name: "taskDetails",
  data() {
    return {
      pageOpen: null,
      type: "",
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
    setType(type) {
      this.type = type;
    },
    async deleteTask(task) {
      await this.$store.dispatch({ type: "removeTask", task });
      this.closePage();
    },
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
    async attachment(link, task) {
      let res = await uploadFile(link);
      console.log(res);
      let txt = `attached ${res.original_filename}.${res.format} to`;
      let user = this.$store.getters.currUser;
      this.$store.dispatch({
        type: "addActivity",
        activity: { res, task, txt, user },
      });
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
    editDynamic,
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
};
</script>