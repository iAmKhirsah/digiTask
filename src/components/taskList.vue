<template>
  <div class="task-list-container">
    <div class="task-list-container-content thin-scrollbar">
      <Container
        :data-index="idx"
           drop-class="card-ghost-drop"
              drag-class="card-ghost"
        group-name="group-list-container"
        :drop-placeholder="dropPlaceholderOptions"
        
        :get-child-payload="(itemindex) => getChildPayload(itemindex)"
        @drop="onDrop($event)"
      >
        <Draggable
        
          v-for="(task, itemIndex) in groupTasks"
          :key="itemIndex"
          class="task-list-content"
        >
          <div class="task-list-content">
            <!-- <div class="task-list-content" v-for="task in group.tasks" :key="task.id"> -->
            <task-preview @updateTask="updateTask" :isMiniPreview="isMiniPreview" @miniPreview="miniPreview" :task="task" :board="board" @editTask="editTask" />
          </div>
        </Draggable>
      </Container>
    </div>
    <add-task @addTask="addTask" :isNewTask="isNewTask" v-if="!isNewTask" />
  </div>
</template>
<script>
import taskPreview from "./taskPreview.vue";
import addTask from "./addTask.vue";
import { Container, Draggable } from "vue-smooth-dnd";
export default {
  name: "taskList",
  props: ["group", "isNewTask", "idx", "board","isMiniPreview"],
  components: { taskPreview, addTask, Container, Draggable },
  data() {
    return {
  
      dropPlaceholderOptions: {
    className: "drop-preview",
    animationDuration: "150",
    showOnTop: false,
  
   },};
  },
  methods: {
    created() {},
    editTask(taskId) {
      this.$emit("editTask", taskId, this.group.id);
    },
    miniPreview(){
     this.$emit("miniPreview")
    },
    addTask(newTask) {
      this.$emit("addTask", newTask, this.group.id);
    },
      updateTask(task){
        let group = JSON.parse(JSON.stringify(this.group))
        let idx = group.tasks.findIndex((currTask)=> currTask.id === task.id)
        group.tasks[idx]= task
        this.$emit('updateGroup' , group)
      },
    async onDrop(dropResult) {
      try {
        let content = { groupIdx: this.idx, dropResult };
        await this.$store.dispatch({ type: "applyDrag", content });
      } catch (err) {
        console.log("Couldnt drag group", err);
      }
    },
    getChildPayload(index) {
      return this.board.groups[this.idx].tasks[index];
    },
  
    
  },
  computed:{
    groupTasks(){
      return this.group.tasks
    }
  }
 
};
</script>