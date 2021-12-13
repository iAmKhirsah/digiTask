<template>
  <section class="task-details-overlay" v-if="pageOpen && currTask">
    <section class="task-details-wrapper">
      <div class="task-details-container" v-click-outside="closePage">
        <button class="task-details-container-btn" @click="closePage">
          <span class="icon-lg close-icon"> </span>
        </button>
        <div
          class="task-background-cover"
          v-if="isTaskStyle"
          :style="getTaskCover"
        >
          <div class="window-cover-menu">
            <div class="window-cover-menu-button" @click="setType('cover')">
              <span class="span-settings"></span>
              Cover
            </div>
          </div>
        </div>
        <div class="task-details-header">
          <!-- <span><i class="fas fa-window-maximize"></i></span> -->
          <span class="icon-lg card-icon-cover"></span>
          <form v-if="titleEdit" v-on:keydown.enter="saveTitle">
            <textarea
              class="textarea-another-list"
              ref="taskTitle"
              @keydown.enter.prevent
              oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
              onfocus='this.style.height = "";this.style.height = this.scrollHeight + "px"'
              v-model="taskTitle"
              maxlength="512"
              placeholder="Enter Task title..."
              v-click-outside="saveTitle"
            />
          </form>
          <div v-else>
            <h1 @click="editTitle">{{ getTask.title }}</h1>
            <p>in group {{ getGroup.title }}<span></span></p>
          </div>
        </div>

        <div class="task-details-content-container">
          <div class="task-details-main-content">
            <div class="task-details-addons">
              <task-addons
                :getTask="getTask"
                :getBoard="getBoard"
                @updatedTask="updatedTask"
                @setCover="setCover"
                @saveEdit="saveEdit"
                @editDesc="editDesc"
                :descEdit="descEdit"
                @closeDescEdit="closeDescEdit"
              />
            </div>
            <div class="task-details-checklist" v-if="getTaskCheckLists.length">
              <div class="task-details-checklist-content">
                <span class="task-checklist-symbol">
                  <span class="icon-lg checklist-icon"></span>
                </span>
                <check-list
                  v-for="checklist in getTask.checklists"
                  :key="checklist.id"
                  :checklist="checklist"
                  :currTask="getTask"
                  @updatedTask="updatedTask"
                ></check-list>
              </div>
            </div>

            <div class="task-details-activity">
              <div class="task-details-activity-content">
                <!-- <span> <i class="fas fa-align-left"></i></span> -->
                <span class="icon-lg icon-activity"></span>
                <p class="task-activity-title">Activity</p>
              </div>

              <span class="user-tag-name in-header side"
                ><img class="image-settings" :src="getUser.imgUrl"
              /></span>
              <form>
                <div class="comments-container">
                  <textarea
                    type="text"
                    v-model="commentTxt"
                    placeholder="Write a comment..."
                    @focus="commentsButtons"
                  />
                  <div class="save-btn" v-if="isCommentsButton">
                    <button @click="sendComment">Save</button>
                  </div>
                </div>
              </form>
              <activity-flow
                :task="getTask"
                :group="getGroup"
                :board="getBoard"
              />
            </div>
          </div>
          <div class="task-details-sidebar">
            <p class="task-details-subtitle">Add to card</p>
            <div class="task-details-add-to-card">
              <edit-dynamic
                :type="type"
                v-if="type"
                :getBoard="getBoard"
                :getTask="getTask"
                :getUser="getUser"
                @attachment="attachment"
                @attachmentLink="attachmentLink"
                @updateBoard="updateBoard"
                @updateGroup="updateGroup"
                @deleteTask="deleteTask"
                @taskActivity="taskActivity"
                @updateTask="updatedTask"
                @closeModal="closeModal"
                @createLabel="createLabel"
                @deleteLabel="deleteLabel"
              />
              <div class="open-edit-dynamic-btn" @click="setType('members')">
                <span class="span-settings icon-sm member-icon"></span>
                Members
              </div>
              <div class="open-edit-dynamic-btn" @click="setType('labels')">
                <span class="span-settings">
                  <span class="icon-sm label-icon"></span
                ></span>
                Labels
              </div>
              <div class="open-edit-dynamic-btn" @click="setType('checklist')">
                <span class="span-settings"
                  ><span class="icon-sm checklist-icon"></span
                ></span>
                Checklist
              </div>
              <div class="open-edit-dynamic-btn" @click="setType('dates')">
                <span class="span-settings"><i class="far fa-clock"></i></span>
                Dates
              </div>
              <div class="open-edit-dynamic-btn" @click="setType('attachment')">
                <span class="span-settings">
                  <span class="icon-sm attachments"></span
                ></span>
                Attachment
              </div>
              <div
                class="open-edit-dynamic-btn"
                @click="setType('cover')"
                v-if="!getTask.style.bgColor"
              >
                <span class="span-settings">
                  <span class="icon-sm cover-icon"></span
                ></span>
                Cover
              </div>
            </div>
            <p class="task-details-subtitle">Actions</p>
            <div class="task-details-actions">
              <div class="open-edit-dynamic-btn" @click="setType('copy')">
                <span class="icon-sm icon-copy"></span> Copy
              </div>
              <div class="open-edit-dynamic-btn" @click="setType('archive')">
                <span class="icon-sm archive-icon"></span> Archive
              </div>
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
import editDynamic from "../components/editDynamic.vue";
import { uploadFile } from "../services/serverlessUploadService";
import taskAddons from "../components/taskAddons.vue";
import checkList from "../components/checkList.vue";

export default {
  name: "taskDetails",
  data() {
    return {
      pageOpen: null,
      type: "",
      currTask: {},
      taskTitle: "",
      titleEdit: false,
      descEdit: false,
      commentTxt: "",
      isCommentsButton: false,
    };
  },
  async created() {
    try {
      let groupId = this.$route.params.groupId;
      let taskId = this.$route.params.taskId;
      let boardId = this.$route.params.boardId;
      console.log(boardId);
      await this.$store.dispatch({
        type: "updateStore",
        boardId,
        taskId,
        groupId,
      });
      this.currTask = JSON.parse(JSON.stringify(this.getTask));
      this.taskTitle = this.currTask.title;
      this.pageOpen = true;
    } catch (err) {
      console.log("Couldnt load task", err);
    }
  },
  methods: {
    commentsButtons() {
      this.isCommentsButton = true;
    },
    commentButtonsOff() {
      this.$nextTick(() => {
        this.isCommentsButton = false;
      });
    },
    async setCover(img) {
      console.log(img);
      let task = JSON.parse(JSON.stringify(this.getTask));
      task.style.imgUrl = img;
      task.style.bgColor = "";
      await this.$store.dispatch({ type: "updateTask", task });
    },
    async sendComment() {
      if (this.commentTxt.match(/^\s*$/)) return;
      this.isCommentsButton = false;
      let user = this.getUser;
      let comment = {
        txt: this.commentTxt,
        createdAt: Date.now(),
        byMember: user,
      };
      this.$store.commit({ type: "setComment", comment });
      await this.$store.dispatch({ type: "updateTask", task: this.getTask });
      this.commentTxt = "";
    },
    editTitle() {
      this.titleEdit = true;
      this.descEdit = false;
      this.$nextTick(() => {
        this.$refs.taskTitle.focus();
      });
    },
    saveTitle() {
      this.currTask.title = this.taskTitle;
      this.saveTask();
    },
    editDesc() {
      this.descEdit = true;
      this.titleEdit = false;
    },
    closeDescEdit() {
      this.descEdit = false;
    },
    closeModal() {
      this.type = "";
    },

    async saveTask() {
      try {
        if (this.taskTitle.match(/^\s*$/)) {
          this.taskTitle = this.currTask.title;
          this.titleEdit = false;
          return;
        }
        this.titleEdit = false;
        // let task = JSON.parse(JSON.stringify(this.currTask))
        // await this.updatedTask(task);
        await this.updatedTask(this.currTask);

        // this.currTask = JSON.parse(JSON.stringify(this.getTask))
      } catch (err) {
        console.log("Couldnt SAVE TASK TITLE", err);
      }
    },
    async createLabel(label) {
      try {
        await this.$store.dispatch({ type: "createLabel", label });
      } catch (err) {
        console.log("Error on CREATELABEL in TASKDETAILS", err);
      }
    },
    async deleteLabel(label) {
      try {
        await this.$store.dispatch({ type: "deleteLabel", label });
      } catch (err) {
        console.log("Error on DELETELABEL in TASKDETAILS");
      }
    },
    async saveEdit(task = { ...this.getTask }) {
      try {
        if (!this.editDesc) return;
        this.descEdit = false;
        await this.updatedTask({ ...task });
        this.currTask = { ...this.getTask };
      } catch (err) {
        console.log("CANT SAVE EDIT", err);
      }
    },
    setType(type) {
      this.type = type;
    },
    async deleteTask(task) {
      await this.$store.dispatch({ type: "removeTask", task });
      this.closePage();
    },
    closePage() {
      console.log("hello");
      this.$router.push(`/b/${this.$route.params.boardId}`);
    },
    async updatedTask(task) {
      let updatedTask = JSON.parse(JSON.stringify(task));
      let group = this.getGroup;
      let idx = group.tasks.findIndex((task) => task.id === updatedTask.id);
      group.tasks[idx] = updatedTask;
      await this.$store.dispatch({ type: "updateTask", task: updatedTask });
      await this.$store.dispatch({ type: "updateGroup", group });
    },

    async attachmentLink(link) {
      let txt = `attached ${link} to this card`;
      this.taskActivity(txt);
    },
    async taskActivity(txt) {
      try {
        let currTask = this.getTask;
        let user = this.getUser;
        this.$store.dispatch({
          type: "addActivity",
          activity: { task: currTask, txt, user },
        });
      } catch (err) {
        console.log("Failed on TASKACTIVITY in TASKDETAILS", err);
      }
    },
    async updateBoard(board) {
      await this.$store.dispatch({ type: "updateBoard", board });
    },
    async updateGroup(group) {
      await this.$store.dispatch({ type: "updateGroup", group });
    },
    async attachment(link, task) {
      try {
        let res = await uploadFile(link);
        this.$store.dispatch({
          type: "addAttachment",
          attachment: {
            txt: `${res.original_filename}.${res.format}`,
            res,
            task: { id: task.id, title: task.title },
          },
        });

        let txt = `attached ${res.original_filename}.${res.format} to this card`;
        let user = this.getUser;
        this.$store.dispatch({
          type: "addActivity",
          activity: { res, task, txt, user },
        });
      } catch (err) {
        console.log("Failed on ATTACHMENT in TASK DETAILS", err);
      }
    },
  },
  computed: {
    getTask() {
      return this.$store.getters.getCurrTask;
    },
    getGroup() {
      return this.$store.getters.getCurrGroup;
    },
    getBoard() {
      return this.$store.getters.getCurrBoard;
    },
    getUser() {
      return this.$store.getters.currUser;
    },
    getTaskCheckLists() {
      return this.$store.getters.getCurrTask.checklists;
    },
    getTaskCover() {
      if (this.getTask.style.bgColor)
        return { "background-color": this.getTask.style.bgColor };
      else if (this.getTask.style.imgUrl)
        return { "background-image": "url(" + this.getTask.style.imgUrl + ")" };
    },
    isTaskStyle() {
      return this.getTask.style.bgColor || this.getTask.style.imgUrl;
    },
  },
  components: {
    taskDescription,
    activityFlow,
    editDynamic,
    taskAddons,
    checkList,
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
};
</script>