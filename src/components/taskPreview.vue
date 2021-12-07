<template>
  <div class="task-preview-container" v-if="task"  >
    <button class="edit-button"></button>
    <div class="task-cover">  </div>
    <task-preview-label :isMiniPreview="isMiniPreview" @miniPreview="miniPreview" :task="task" :board="board"/>
    <div @click="editTask(task.id)" class="task-preview" >
      <div class="task-preview-content">{{ task.title }}</div>
    </div>
  <div class="task-preview-info" v-if="hasInfo">
    <span class="task-badges">
    <!-- <span class="badge notification" ><i class="far fa-bell" aria-hidden="true"></i></span> -->
    <span class="badge due-date" @click="toggleDueDateDone" :class="isDueDate" v-if="validateDates" ><span class="clock-icon"></span><span class="short-date">{{startDate}} {{dueDate}}</span></span>
    <span v-if="task.description" class="badge description"> </span>
     <span class="badge comments" v-if="hasCommnets"></span>
       <span class="badge members" v-for="(member,idx) in taskMembers" :key="idx"  ><render-members  :member="member"/></span>
  </span>
     <!-- {
            id: 'c104',
            title: 'Help me',
            description: 'description',
            comments: [
              {
                id: 'ZdPnm',
                txt: 'also @yaronb please CR this',
                createdAt: 1590999817436.0,
                byMember: {
                  _id: 'u101',
                  fullname: 'Tal Tarablus',
                  imgUrl:
                    'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
              },
              {
                id: 'ZdPnmm2',
                txt: 'beny fix digiTask pls',
                createdAt: 1590999917436.0,
                byMember: {
                  _id: 'u101',
                  fullname: 'Tal Tarablus',
                  imgUrl:
                    'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                },
              },
            ],
            checklists: [
              {
                id: 'YEhmF',
                title: 'Checklist',
                todos: [
                  {
                    id: '212jX',
                    title: 'To Do 1',
                    isDone: false,
                  },
                ],
              },
            ],
            members: [
              {
                _id: 'u101',
                username: 'Tal',
                fullname: 'Tal Tarablus',
                imgUrl:
                  'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
              },
            ],
            labelIds: ['l101', 'l102'],
            createdAt: 1590999730348,
            dueDate: 16156215211,
            byMember: {
              _id: 'u101',
              username: 'Tal',
              fullname: 'Tal Tarablus',
              imgUrl:
                'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
            },
            style: {
              bgColor: '#26de81',
            }, -->

  </div>
  </div>
</template>
<script>
import taskPreviewLabel from './taskPreviewLabel.vue';
import renderMembers from './renderMembers.vue'
import RenderMembers from './renderMembers.vue';
export default {
  components: { taskPreviewLabel ,renderMembers},
  name: "taskPreview",
  props: ["task","board","isMiniPreview"],
  methods: {
    editTask(taskId) {
      this.$emit("editTask", taskId);
    },
    miniPreview(){
      this.$emit("miniPreview")
    } ,
    toggleDueDateDone(){
      let task = JSON.parse(JSON.stringify(this.task))
      task.dates.isDone = !task.dates.isDone 
      this.$emit('updateTask',task)
    }
  },
  computed:{
    hasInfo(){
      return this.hasCommnets || this.hasMembers || this.validateDates || this.taskMembers || this.task.description
    },
    hasCommnets(){
       return this.task.comments && this.task.comments.length
    },
    hasMembers(){
      return this.task.members && this.task.members.length
    },
    startDate(){
        let dueTime = new Date(this.task.dates.dueDate).getTime()
        let startTime = new Date(this.task.dates.startDate).getTime()
      if(dueTime-startTime < (1000*60*60*24))return
      let date = new Date(this.task.dates.startDate)
      let shortMonth = date.toLocaleString('en-us', { month: 'short' });
      let day = date.getDate()
      let stringDate = `${shortMonth}  ${day} - `
      return stringDate
    },
    dueDate(){
      
      let date = new Date(this.task.dates.dueDate)
      let shortMonth = date.toLocaleString('en-us', { month: 'short' });
      let day = date.getDate()
      let stringDate = `${shortMonth}  ${day}`

      return stringDate
    },
    isDueDate(){
      let dateNow = Date.now()
      let dueTime = new Date(this.task.dates.dueDate).getTime()
      let isDueToday =  (dueTime - dateNow + 1000*60*60*24) < (1000*60*60*24)
      let isOverDue = (dueTime - dateNow + 1000*60*60*24) < 0
      let isDone = this.task.dates.isDone
      return {'over-due':isOverDue&!isDone, 'due-soon': !isOverDue&&isDueToday&&!isDone , done:isDone}
    },

    validateDates(){
      return this.task.dates.startDate || this.task.dates.dueDate
    },
    taskMembers(){
      return this.task.members
    }

  },
  components:{
      taskPreviewLabel, RenderMembers
    }
};
</script>