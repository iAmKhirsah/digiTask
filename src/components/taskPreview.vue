<template>
  <div class="task-preview-container" v-if="task" >
    <task-preview-label :isMiniPreview="isMiniPreview" @miniPreview="miniPreview" :task="task" :board="board"/>
    <div @click="editTask(task.id)" class="task-preview" >
      <div class="task-preview-content">{{ task.title }}</div>
    </div>
  <div class="task-preview-info">
    <span class="notification"></span>
    <span class="due-date"></span>
    <span v-if="task.description" class="description"> </span>
     <span class="comments"></span>
      <span class="attachments"></span>
       <span class="members"></span>
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
  components:{
      taskPreviewLabel
    }
};
</script>