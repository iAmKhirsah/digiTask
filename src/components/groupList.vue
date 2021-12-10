<template>
  <div>
    <div class="group-list-group">
      <!-- beny -->

      <div class="group-header" v-if="!isEditing" @click="openGroupTitleEdit">
        {{ group.title }}
      </div>
      <form v-else v-on:keydown.enter="changeTitle">
        <textarea
          ref="title"
          class="group-title"
          :oninput="onInputTextarea"
          :onfocus="onFocusTextarea"
          v-model="groupTitle"
          maxlength="512"
          @blur="disableTitleEdit"
        />
      </form>
      <button class="group-header-edit-btn" @click="actionOn">
        <span class="icon-sm dots"></span>
      </button>

      <edit-dynamic
        v-if="isActionOn"
        :type="'groupEdit'"
        @closeModal="actionOff"
        v-click-outside="actionOff"
        @newTaskOpen="newTaskOpen"
        :group="group"
        @deleteGroup="deleteGroup"
      />
      <add-task
        v-if="isNewTask"
        @closeNewTask="closeNewTask"
        @addTask="addTask"
        :focusTextArea="focusTextArea"
        :inGroup="inGroup"
      />
      <task-list
        @onDrop="onDrop"
        :group="group"
        :board="board"
        @editTask="editTask"
        @addTask="addTask"
        @miniPreview="miniPreview"
      @updateGroup="updateGroup"
         :isMiniPreview="isMiniPreview"
        :isNewTask="isNewTask"
        :idx="idx"
        class="group-single"
      />
    </div>
  </div>
</template>
<script>
import taskList from "./taskList.vue";
import editDynamic from "./editDynamic.vue";
import vClickOutside from "v-click-outside";
import addTask from "./addTask.vue";

export default {
  name: "groupList",
  props: ["group", "idx", "board","isMiniPreview"],
  components: { taskList, editDynamic, addTask },
  data() {
    return {
      groupTitle: '',
      isEditing: false,
      isActionOn: false,
      isNewTask: false,
      inGroup: true,
      focusTextArea: true,
      
    };
  },
  created() {},
  methods: {
    miniPreview(){
      this.$emit("miniPreview")
    },
    changeTitle() {
      this.$nextTick(() => {
        this.$refs.title.blur();
      });
    },
    actionOn() {
      this.isActionOn = true;
    },
    actionOff() {
      if (this.isActionOn) this.isActionOn = false;
    },
    editTask(taskId, groupId) {
      let boardId = this.$route.params.boardId;
      let routerLink = `${boardId}/g/${groupId}/t/${taskId}`;
      this.$router.push(routerLink);
    },
    addTask(task) {
      this.$emit("addTask", task, this.group.id);
    },
    // updateGroup(group) {
    //   console.log("group title changed");
    //   this.$emit("updateGroup", group);
    // },
    newTaskOpen() {
      this.isNewTask = true;
    },
    closeNewTask() {
      this.isNewTask = false;
    },
    updateGroup(group) {
      console.log("group title changed");
      this.$emit("updateGroup", { ...group });
    },
    disableTitleEdit() {
      if (this.groupTitle){
        //  let updatedGroup = JSON.parse(JSON.stringify(this.group))
         let updatedGroup = JSON.parse(JSON.stringify(this.group))
         updatedGroup.title=this.groupTitle
         this.$emit("updateGroup", updatedGroup);
      }
       
      this.isEditing = false;
      this.groupTitle = '';
    },
    openGroupTitleEdit() {
      this.isEditing = true;
      this.groupTitle = this.group.title 
      this.$nextTick(() => {
        this.$refs.title.focus();
        this.$refs.title.select();
      });
    },
    onDrop(groupIdx, dropResult) {
      if (!groupIdx) groupIdx = this.idx;
      console.log(groupIdx, dropResult);
      this.$emit("onDrop", groupIdx, dropResult);
    },
    deleteGroup(group) {
      this.$emit("deleteGroup", group);
    },
    
  },
  computed:{
   onInputTextarea(){
      return 'this.style.height = "";this.style.height = this.scrollHeight + "px"'
    },
    onFocusTextarea(){
      return 'this.style.height = "";this.style.height = this.scrollHeight + "px"'
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.$refs.title[0].focus();
    // });
    //       this.$nextTick(() => {
    //   this.$refs.title[0].blur();
    // });
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
};
</script>