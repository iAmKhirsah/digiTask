<template>
  <div class="task-label-preview-container" v-if="hasLabels">
    <div v-for="label in taskLabels" :key="label.id" class="task-labels-container" >
        <div class="label-preview" :style="{background:label.color }" >
            Da32
            
                </div>
    </div>
 
    
  </div>
</template>
<script>
export default {
  name: "taskLabelPreview",
  props: ["task","board"],
  methods: {
    editTask(taskId) {
      this.$emit("editTask", taskId);
    }
  },
  computed:{
      hasLabels(){
          return this.task.labelIds.length
      },
      taskLabels(){
         
       let labels = []
       this.task.labelIds.forEach((labelId)=>{
       this.board.labels.forEach((label)=> {
            if(label.id === labelId) labels.push(label)
        })      
         })
         console.log(labels)
         return labels
      },
      backgroundColor(){
 
      },

  }
};
</script>