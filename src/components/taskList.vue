<template>
  <div class="task-list-container">
    <div class="task-list-container-content thin-scrollbar">
      <Container 
      :data-index="idx" group-name="group-list-container"
       @drop="onDrop($event)">
        <Draggable v-for="task in group.tasks" :key="task.id" class="task-list-content">
          <div class="task-list-content">
      <!-- <div class="task-list-content" v-for="task in group.tasks" :key="task.id"> -->
        <task-preview :task="task" @editTask="editTask" />
      </div>
        </Draggable>
      </Container>
    </div>
    <add-task @addTask="addTask"  :isNewTask="isNewTask" v-if="!isNewTask"  />
  </div>
</template>
<script>
import taskPreview from "./taskPreview.vue";
import addTask from "./addTask.vue"
import { Container, Draggable } from 'vue-smooth-dnd'
export default {
  name: "taskList",
  props: ["group","isNewTask","idx"],
  components: { taskPreview,addTask ,Container,Draggable},
  data() {
    return {
    
    };
  },
  methods: {
    editTask(taskId) {
      this.$emit("editTask", taskId, this.group.id);
    },
    addTask(newTask) {
      this.$emit("addTask", newTask, this.group.id);

      
    },
    onDrop(dropResult){
      this.$emit('onDrop',this.idx,dropResult)
    },
       getChildPayload (groupIndex, itemIndex) {
 
      return this.groups[groupIndex][itemIndex]
    },
    getShouldAcceptDrop (index, sourceContainerOptions, payload) {
      return this.flags[index].drop
    },

 
  },
  
  
};
</script>