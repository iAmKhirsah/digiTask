<template>
  <div class="task-list-container">
    <div class="task-list-container-content thin-scrollbar">
      <Container 
      :data-index="idx" group-name="group-list-container"
       :get-child-payload="itemindex => getChildPayload(itemindex)"
       @drop="onDrop($event)">
        <Draggable v-for="(task,itemIndex) in group.tasks" :key="itemIndex" class="task-list-content">
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
  props: ["group","isNewTask","idx","board"],
  components: { taskPreview,addTask ,Container,Draggable},
  data() {
    return {
      
    };
  },
  methods: {
    created(){
      
    },
    editTask(taskId) {
      this.$emit("editTask", taskId, this.group.id);
    },
    addTask(newTask) {
      this.$emit("addTask", newTask, this.group.id);

      
    },
    async onDrop(dropResult) {
      try {
        
       console.log(dropResult)
        let tasks = this.applyDrag(
          this.board.groups[this.idx].tasks,
          dropResult
        );
        this.board.groups[this.idx].tasks = [...tasks]
        let board = {...this.board}
        await this.$store.dispatch({ type: "updateBoard", board});
      } catch (err) {
        console.log("Couldnt drag group", err);
      }
    },
    applyDrag(arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult;
      console.log(removedIndex, addedIndex, payload);
      if (removedIndex === null && addedIndex === null) return arr;

      const result = [...arr];
      let itemToAdd = payload;

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }

      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }

      return result;
    },
       getChildPayload (index) {
         
      return this.board.groups[this.idx].tasks[index]
    },
    getShouldAcceptDrop (index, sourceContainerOptions, payload) {
      return this.flags[index].drop
    },

 
  },
  
  
};
</script>