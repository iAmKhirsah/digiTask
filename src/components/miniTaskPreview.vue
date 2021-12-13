<template>
<section class="edit-modal-preview-container">
  <div
    class="task-preview-container edit-preview-container "
    v-if="task"
    :style="mainContentBgColor"
  >
 
       <!-- <div
      v-if="hasCover"
      class="task-cover"
      :class="{ small: !infoCover }"
      :style="bgColor"
    ></div> -->
 <task-preview-label
      v-if="infoCover"
      :isMiniPreview="true"
      :task="task"
      :board="getBoard"
    />
    <textarea  class="textarea-another-list"
              ref="taskTitle"
              @keydown.enter.prevent="saveTitle"
              oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
              onfocus='this.style.height = "";this.style.height = this.scrollHeight + "px"'
              maxlength="512"
              placeholder="Enter Task title..."
             v-model="updatedTask.title"/>
    <div class="task-preview-info">
      <span class="task-badges" v-if="hasInfo">
        <div class="badges-container">
          <span
            class="badge due-date"
            
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
 <div class="edit-modal-save-btn">
<span @click="saveTitle"><button>Save</button></span>
</div>
    </div>
    
 </section>
</template>

<script>
import taskPreviewLabel from './taskPreviewLabel.vue'
import renderMembers from './renderMembers.vue'
export default {
    name:'miniTaskPreview',
        props:['task'],
        data(){
            return{
                updatedTask:{}
            }
        },
        created(){
            this.updatedTask = JSON.parse(JSON.stringify(this.task))
             this.$nextTick(() => {
        this.$refs.taskTitle.focus();
          this.$refs.taskTitle.select();
      });
        },
        methods:{
            saveTitle(){
                let task = JSON.parse(JSON.stringify(this.updatedTask))
                this.$emit('updateTask',task)
                this.$emit('closeEditModal')
            },
           
        },
        computed:{
             hasCover() {
      return this.task.style.bgColor;
    },
    hasInfo() {
      return (
        (this.hasCommnets ||
          this.validateDates ||
          this.task.description ||
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
      return { "background-color": this.task.style.bgColor };
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
        return { "background-color": this.task.style.bgColor };
      }
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
        },
        components:{
            taskPreviewLabel,
            renderMembers
        }
}
</script>