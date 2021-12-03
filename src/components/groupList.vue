<template>
  <div>
    <div class="group-list-group">
      <!-- beny -->
      <div class="group-header">
        <div v-if="editingGroup.id !== group.id" @click="groupTitle(group)">
          {{ group.title }}
        </div>

        <textarea
          ref="title"
          class="group-title"
          v-else
          oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
          onfocus='this.style.height = "";this.style.height = this.scrollHeight + "px"'
          v-model="editingGroup.title"
          maxlength="512"
          @blur="disableTitleEdit"
        />
        <!-- <span class="input" role="textbox"  contenteditable @change="updateGroup">{{group.title}}</span> -->

        <button class="group-header-edit-btn" @click="actionOn">
          <i class="fas fa-ellipsis-h"></i>
        </button>
      </div>

      <edit-dynamic
        v-if="isActionOn"
        :type="'groupEdit'"
        @closeModal="actionOff"
        v-click-outside="actionOff"
        @newTaskOpen="newTaskOpen"
        :group="group"
      />
      <add-task v-if="isNewTask" @closeNewTask="closeNewTask" @addTask="addTask" :focusTextArea="focusTextArea" :inGroup="inGroup"/>
      <task-list
        :group="group"
        @editTask="editTask"
        @addTask="addTask"
        :isNewTask="isNewTask"
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
  props: ["group"],
  components: { taskList, editDynamic, addTask },
  data() {
    return {
      editingGroup: {},
      isEditing: false,
      isActionOn: false,
      isNewTask: false,
      inGroup:true,
      focusTextArea:true,
      
    };
  },
  methods: {
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
    newTaskOpen(){
      this.isNewTask = true
    },
    closeNewTask(){
      this.isNewTask = false
    },
    updateGroup(group) {
      console.log("group title changed");
      this.$emit("updateGroup", { ...group });
    },
    disableTitleEdit() {
      this.$emit("updateGroup", { ...this.editingGroup });
      this.isEditing = false;
      this.editingGroup = {};
    },
    groupTitle(group) {
      this.isEditing = true;
      this.editingGroup = { ...group };
      this.$nextTick(() => {
        this.$refs.title.focus();
      });
    },
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.$refs.title[0].focus();
    // });
    //       this.$nextTick(() => {
    //   this.$refs.title[0].blur();
    // });
  },
  computed: {},
  directives: {
    clickOutside: vClickOutside.directive,
  },
};
</script>