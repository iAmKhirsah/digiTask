<template>
  <div
    class="task-preview-container"
    v-if="task"
    :style="mainContentBgColor"
  >
    <!-- <button class="edit-button"></button> -->
    <div
      v-if="hasCover"
      class="task-cover"
      :class="{ small: !infoCover }"
      :style="bgColor"
      @click="editTask(task.id)"
    ></div>
    <task-preview-label
      v-if="infoCover"
      :isMiniPreview="isMiniPreview"
      @miniPreview="miniPreview"
      :task="task"
      :board="board"
    />
    <div class="task-preview" @click="editTask(task.id)">
      <div class="task-preview-content" :class="{ 'no-info': !infoCover }">
        {{ task.title }}
      </div>
      <span
        class="icon-settings pencil icon-sm edit-pencil-icon"
        @click.stop="openEditModal"
      >
        <div class="quick-edit-menu" v-if="isOpenEditModal">
          <edit-modal
            @closeEditModal="closeEditModal"
            :task="task"
            @editTask="editTask"
            :editPos="editPos"
          ></edit-modal>
        </div>
      </span>
    </div>
    <div class="task-preview-info">
      <span class="task-badges" v-if="hasInfo">
        <div class="badges-container">
          <span
            class="badge due-date"
            @click="toggleDueDateDone"
            :class="isDueDate"
            v-if="validateDates"
            ><span class="clock-icon"></span
            ><span class="short-date">{{ startDate }} {{ dueDate }}</span></span
          >
          <span v-if="task.description" class="badge description"> </span>
          <span class="badge comments" v-if="hasCommnets"
            ><span class="comments-count">{{ commnetsCount }}</span></span
          >
          <span class="badge checklist" v-if="todosLength" :class="todosDone">
            <span class="todos-done">{{ renderChecklist }}</span>
          </span>
        </div>
        <!-- <span class="badge notification" ><i class="far fa-bell" aria-hidden="true"></i></span> -->
        <span class="members-container" v-if="hasMembers">
          <span
            class="badge members"
            v-for="(member, idx) in taskMembers"
            :key="idx"
          >
            <render-members :member="member" />
          </span>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
    
}
</script>