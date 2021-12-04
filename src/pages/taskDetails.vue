<template>
  <section class="task-details-overlay" v-if="pageOpen">
    <section class="task-details-wrapper">
      <div class="task-details-container" v-click-outside="closePage">
        <button class="task-details-container-btn" @click="closePage">
          <i class="fas fa-times"></i>
        </button>
        <div class="task-details-header">
          <span><i class="fas fa-window-maximize"></i></span>
          <form v-if="titleEdit" v-on:keydown.enter="saveTask"
          >
            <textarea
            
            class="textarea-another-list"
            ref="taskTitle"
            @keydown.enter.prevent
            oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
            onfocus='this.style.height = "";this.style.height = this.scrollHeight + "px"'
            v-model="currTask.title"
            maxlength="512"
            placeholder="Enter Task title..."
            v-click-outside="saveTask"
          />
          </form>
          <div v-else ><h1 @click="editTitle">{{currTask.title}}</h1>
          <p>in group {{ getGroup.title }}<span></span></p>
          </div>
        </div>
        <div class="task-details-addons">
          ADDED MEMBERS GO HERE, ADDED LABELS GO HERE
        </div>
        <div class="task-details-content-container">
          <div class="task-details-main-content">
            <span class="task-description-symbol">
              <i class="fas fa-align-left"></i
            ></span>
            <task-description :task="getTask" @saveEdit="saveEdit" @editDesc="editDesc" :descEdit="descEdit" @closeDescEdit="closeDescEdit" />

            <div class="task-details-activity">
              <div class="task-details-activity-content">
                <span> <i class="fas fa-align-left"></i></span>
                <p>Activity</p>
              </div>
              <form @submit.prevent="sendMsg">
                <div class="user-tag-name in-header">DR</div>
                <textarea type="text" placeholder="Write a comment..." />
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
              <div @click="setType('members')">
                <span><i class="far fa-user"></i></span> Members
              </div>
              <div @click="setType('labels')">
                <span><i class="fas fa-tag"></i></span> Labels
              </div>
              <div @click="setType('checklist')">
                <span><i class="far fa-check-square"></i></span> Checklist
              </div>
              <div @click="setType('dates')">
                <span><i class="far fa-clock"></i></span> Dates
              </div>
              <div @click="setType('attachment')">
                <span><i class="fas fa-paperclip"></i></span> Attachment
              </div>
              <div @click="setType('cover')">
                <span><i class="far fa-window-maximize"></i></span> Cover
              </div>
            </div>
            <p>Actions</p>
            <div class="task-details-actions">
              <div @click="setType('move')">
                <span><i class="fas fa-arrow-right"></i></span> Move
              </div>
              <div>
                <span><i class="far fa-clone"></i></span> Copy
              </div>
              <div>
                <span><i class="far fa-eye"></i></span>
                <input type="checkbox" /> Watch
              </div>
              <div @click="setType('archive')">
                <span><i class="fas fa-archive"></i></span> Archive
              </div>
              <div @click="setType('share')">
                <span><i class="fas fa-share-alt"></i></span> Share
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
          @addMember="addMember"
          @closeModal="closeModal"
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
      currTask:{},
      titleEdit:false,
      descEdit:false,
    };
  },
  async created() {
    let groupId = this.$route.params.groupId;
    console.log(groupId);
    let taskId = this.$route.params.taskId;
    await this.$store.dispatch({ type: "getTaskDetails", taskId, groupId });
    this.pageOpen = true;
    this.currTask = this.getTask
  },
  methods: {
    editTitle(){ 
      this.titleEdit = true
      this.descEdit = false
      this.$nextTick(() => {
          this.$refs.taskTitle.focus();
        });
      
      
    },
    editDesc(){
      this.descEdit = true
      this.titleEdit = false

    },
    closeDescEdit(){
      this.descEdit=false
    },
    closeModal(){
      this.type=''
    },
    async saveTask(){
      try{
       if(!this.editTitle) return
      this.titleEdit = false
      let task = {...this.currTask}
     await this.updatedTask(task)
      this.currTask = {...this.getTask}
      }catch(err){
        console.log('Couldnt SAVE TASK TITLE',err)
      }
    },
   async saveEdit(task = {...this.getTask}){
     try{
       if(!this.editDesc) return
       this.descEdit = false
     await this.updatedTask({...task})
   this.currTask = {...this.getTask}
     }catch(err){
       console.log('CANT SAVE EDIT',err)
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
      console.log('hello')
      this.$router.push(`/b/${this.$route.params.boardId}`);
    },
    async updatedTask(updatedTask) {
      let group = this.getGroup;
      let idx = group.tasks.findIndex((task) => task.id === updatedTask.id);
      group.tasks[idx] = updatedTask;
     await this.$store.dispatch({ type: "updateTask", task: updatedTask });
     await this.$store.dispatch({ type: "updateGroup", group });
    },
    async addMember(member) {
      try {
        await this.$store.dispatch({ type: "addMember", member });
        let currTask = this.getTask;
        await this.updatedTask(currTask);
        let user = this.getUser;
        let txt = `added ${member.fullname} to ${currTask.title}`;
        this.$store.dispatch({
          type: "addActivity",
          activity: { task: currTask, txt, user },
        });
      } catch (err) {
        console.log("Failed on ADDMEMBER in TASKDETAILS", err);
      }
    },
    async attachment(link, task) {
      try {
        let res = await uploadFile(link);
        console.log(res);
        let txt = `attached ${res.original_filename}.${res.format} to`;
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
      return { ...this.$store.getters.getCurrTask };
    },
    getGroup() {
      return { ...this.$store.getters.getCurrGroup };
    },
    getBoard() {
      return { ...this.$store.getters.getCurrBoard };
    },
    getUser() {
      return { ...this.$store.getters.currUser };
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