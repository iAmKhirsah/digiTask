<template>
  <div
    :class="['task-preview-container', isImgUrlFull]"
    v-if="task"
    :style="mainContentBgColor"
    @click.self="editTask(task.id)"
    @contextmenu.prevent="openEditModal($event, true)"
  >
    <!-- <button class="edit-button"></button> -->
    <div
      v-if="hasCover"
      class="task-cover"
      :class="coverClasses"
      :style="bgColor"
      @click="editTask(task.id)"
    ></div>
    <task-preview-label
      v-if="infoCover"
      :isMiniPreview="isMiniPreview"
      @miniPreview="miniPreview"
      :task="task"
      :board="board"
    />
    <div class="task-preview" @click="editTask(task.id)">
      <div class="task-preview-content" :class="{ 'no-info': !infoCover }">
        {{ task.title }}
      </div>
      <span
        class="icon-settings pencil icon-sm edit-pencil-icon"
        @click.stop="openEditModal"
      >
        <div class="quick-edit-menu" v-if="getIsQuickEditOpen">
          <edit-modal
            @closeEditModal="closeEditModal"
            :task="task"
            @editTask="editTask"
            :editPos="editPos"
          ></edit-modal>
        </div>
      </span>
    </div>
    <div class="task-preview-info">
      <span class="task-badges" v-if="hasInfo">
        <div class="badges-container">
          <span
            class="badge due-date"
            @click="toggleDueDateDone"
            :class="isDueDate"
            v-if="validateDates"
            ><span class="clock-icon"></span
            ><span class="short-date">{{ startDate }} {{ dueDate }}</span></span
          >
          <span v-if="task.description" class="badge description"> </span>
          <span class="badge comments" v-if="hasCommnets"
            ><span class="comments-count">{{ commnetsCount }}</span></span
          >
          <span class="badge checklist" v-if="todosLength" :class="todosDone">
            <span class="todos-done">{{ renderChecklist }}</span>
          </span>
        </div>
        <span class="badge attachments" v-if="hasAttachments">{{attachmentCount}}</span>
        <!-- <span class="badge notification" ><i class="far fa-bell" aria-hidden="true"></i></span> -->
        <span class="members-container" v-if="hasMembers">
          <span
            class="badge members"
            v-for="(member, idx) in taskMembers"
            :key="idx"
          >
            <render-members :member="member" />
          </span>
        </span>
      </span>
    </div>
  </div>
</template>
<script>
import taskPreviewLabel from "./taskPreviewLabel.vue";
import renderMembers from "./renderMembers.vue";
import editModal from "./editModal.vue";
export default {
  name: "taskPreview",
  props: ["task", "board", "isMiniPreview"],
  data() {
    return {
      isOpenEditModal: false,
      editPos: {
        left: "",
        top: "",
      },
    };
  },
  created() {},
  methods: {
    openEditModal(ev, isRc = false) {
      if (this.isOpenEditModal) return;
      this.isOpenEditModal = true;
      if (isRc) this.editPos.left = ev.x - ev.offsetX + 240 + "px";
      else this.editPos.left = ev.x - ev.offsetX + 20 + "px";
      this.editPos.top = ev.y - ev.offsetY - 130 + "px";
    },
    closeEditModal() {
      this.isOpenEditModal = false;
    },
    editTask(taskId) {
      this.$emit("editTask", taskId);
    },
    miniPreview() {
      this.$emit("miniPreview");
    },
    updateTask(task) {
      this.$emit("updateTask", task);
    },
    toggleDueDateDone() {
      let task = JSON.parse(JSON.stringify(this.task));
      task.dates.isDone = !task.dates.isDone;
      this.$emit("updateTask", task);
    },
  },
  computed: {
    hasCover() {
      return this.task.style.bgColor || this.task.style.imgUrl;
    },
    coverClasses() {
      return {
        small: !this.infoCover,
        img: this.task.style.imgUrl && this.infoCover,
      };
    },
    hasInfo() {
      return (
        (this.hasCommnets ||
          this.validateDates ||
          this.task.description ||
          this.hasAttachments || 
          this.todosLength) &&
        this.infoCover
      );
    },
    hasCommnets() {
      return this.task.comments && this.task.comments.length;
    },
    commnetsCount() {
      return this.task.comments.length;
    },
    hasMembers() {
      return this.task.members && this.task.members.length;
    },
    hasAttachments(){
      return this.task.attachments && this.task.attachments.length
    },
    attachmentCount(){
      return this.task.attachments.length
    },
    startDate() {
      let dueTime = new Date(this.task.dates.dueDate).getTime();
      let startTime = new Date(this.task.dates.startDate).getTime();
      if (dueTime - startTime < 1000 * 60 * 60 * 24) return;
      let date = new Date(this.task.dates.startDate);
      let shortMonth = date.toLocaleString("en-us", { month: "short" });
      let day = date.getDate();
      let stringDate = `${shortMonth}  ${day} - `;
      return stringDate;
    },
    dueDate() {
      let date = new Date(this.task.dates.dueDate);
      let shortMonth = date.toLocaleString("en-us", { month: "short" });
      let day = date.getDate();
      let stringDate = `${shortMonth}  ${day}`;

      return stringDate;
    },
    isDueDate() {
      let dateNow = Date.now();
      let dueTime = new Date(this.task.dates.dueDate).getTime();
      let isDueToday =
        dueTime - dateNow + 1000 * 60 * 60 * 24 < 1000 * 60 * 60 * 24;
      let isOverDue = dueTime - dateNow + 1000 * 60 * 60 * 24 < 0;
      let isDone = this.task.dates.isDone;
      return {
        "over-due": isOverDue & !isDone,
        "due-soon": !isOverDue && isDueToday && !isDone,
        done: isDone,
      };
    },
    validateDates() {
      return this.task.dates.startDate || this.task.dates.dueDate;
    },
    taskMembers() {
      return this.task.members;
    },
    bgColor() {
      if (this.task.style.bgColor)
        return { background: this.task.style.bgColor };
      else if (this.task.style.imgUrl && this.task.style.isInfo)
        return {
          "background-image": "url(" + this.task.style.imgUrl + ")",
        };
    },
    infoCover() {
      return this.task.style.isInfo;
    },
    taskChecklist() {
      return this.task.checklists;
    },
    todosLength() {
      let todosLength = this.task.checklists.reduce((acc, checklist) => {
        acc += checklist.todos.length;
        return acc;
      }, 0);
      return todosLength;
    },
    renderChecklist() {
      let done = this.task.checklists.reduce((acc, checklist) => {
        acc += checklist.todos.reduce((acc, todo) => {
          if (todo.isDone) acc++;
          return acc;
        }, 0);
        return acc;
      }, 0);
      return `${done}/${this.todosLength}`;
    },
    mainContentBgColor() {
      if (!this.task.style.isInfo) {
        // return { "background-color": this.task.style.bgColor };
        if (this.task.style.bgColor)
          return { background: this.task.style.bgColor };
        else
          return {
            "background-image": "url(" + this.task.style.imgUrl + ")",
          };
      }
    },
    isImgUrlFull(){
      return {'full-cover': this.task.style.imgUrl && !this.task.style.isInfo}
      },
      
    todosDone() {
      let todosLength = this.todosLength;
      let doneTodos = this.task.checklists.reduce((acc, checklist) => {
        acc += checklist.todos.reduce((acc, todo) => {
          if (todo.isDone) acc++;
          return acc;
        }, 0);
        return acc;
      }, 0);

      return { "done-todos": todosLength === doneTodos };
    },
    getBoard() {
      return this.$store.getters.getCurrBoard;
    },
    getUser() {
      return this.$store.getters.currUser;
    },
    getIsQuickEditOpen() {
      return this.isOpenEditModal;
    },
  },
  components: {
    taskPreviewLabel,
    renderMembers,
    editModal,
  },
};
</script>