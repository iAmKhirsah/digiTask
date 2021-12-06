<template>
  <div class="task-preview-container" v-if="task" >
    <task-preview-label :isMiniPreview="isMiniPreview" @miniPreview="miniPreview" :task="task" :board="board"/>
    <div @click="editTask(task.id)" class="task-preview" >
      <div class="task-preview-content">{{ task.title }}</div>
    </div>
  <div class="task-preview-info">
    <span class="task-badges">
    <!-- <span class="badge notification" ><i class="far fa-bell" aria-hidden="true"></i></span> -->
    <span class="badge due-date" :class="isDueDate" v-if="task.dueDate"><span class="short-date">{{startDate}} {{dueDate}}</span></span>
    <span v-if="task.description" class="badge description"> </span>
     <span class="badge comments"></span>
      <span class="badge attachments"></span>
       <span class="badge members"></span>
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

export default {
  components: { taskPreviewLabel },
  name: "taskPreview",
  props: ["task","board","isMiniPreview"],
  methods: {
    editTask(taskId) {
      this.$emit("editTask", taskId);
    },
    miniPreview(){
      this.$emit("miniPreview")
    }
    
    
  },
  computed:{
    startDate(){
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
      console.log(stringDate)
      return stringDate
    },
    isDueDate(){
      let dateNow = Date.now()

      let isDueToday = (dateNow - this.task.dates.dueDate) > 0 && (dateNow - this.task.dates.dueDate) > (1000*60*60*24)
      let isOverDue = (dateNow - this.task.dates.dueDate) < 0

      
      
      return {'due-soon': isDueToday , 'over-due':isOverDue}
    }

  },
  components:{
      taskPreviewLabel
    }
};
</script>