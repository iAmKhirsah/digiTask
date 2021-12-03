 
<template>
  <div class="add-task" v-click-outside="closeNewTask">
    <div v-if="openNewTask">
      <form class="add-task-form" @submit.prevent="addTask">
        <textarea
        class="textarea"
          ref="task"
          oninput='this.style.height = "";this.style.height = this.scrollHeight + "px"'
          onfocus='this.style.height = "";this.style.height = this.scrollHeight + "px"'
          v-model="newTask"
          maxlength="512"
        />
  <div class="add-task-form-btns">

        <button class="add-task-btn" type="submit">Add card</button>
        <button class="add-task-close-btn" type="button" @click="closeNewTask">
          <i class="fas fa-times"></i>
        </button>
  </div>
      </form>
    </div>

    <div class="add-task-add-card" v-if="!openNewTask" @click="newTaskOn">
      <span class="group-add-plus"><i class="fas fa-plus"></i></span
      ><span>Add a card</span>
    </div>
  </div>
</template>
<script>
import vClickOutside from "v-click-outside";
export default {
  name: "addTask",
  props:{
      inGroup:{
          type:Boolean,
          default:false
      },
  
  },

created(){
    console.log(this.inGroup)
    if(this.inGroup){
        this.openNewTask = true
        this.$nextTick(() => {
        this.$refs.task.focus();
      });
    }
  
},
  data(){
      return{
          newTask:'',
          openNewTask:false
         
          
      }
  },methods:{
   addTask(){
       this.$emit('addTask',this.newTask)
       this.newTask=''
        this.$nextTick(() => {
        this.$refs.task.focus();
      });
   },
   closeNewTask(){
  this.openNewTask = false
     this.newTask = ""
      this.$emit('closeNewTask')
   },
   newTaskOn(){
        this.$emit('openNewTask')
        this.openNewTask= true
 this.$nextTick(() => {
        this.$refs.task.focus();
      });
    },
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
};
</script>
