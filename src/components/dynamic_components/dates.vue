<template>
  <div class="dynamic-dates-edit">
    <button class="close" @click="closeModal">
      <span class="material-icons"> clear </span>
    </button>
    <div class="header-layout">
      <header>Dates</header>
    </div>
    <div class="time-picker">
      <date-picker
        class="test"
        v-model="date"
        valueType="timestamp"
        range
        inline
        placeholder="Select date range"
      ></date-picker>
    </div>
    <input type="checkbox" v-model="taskDate.start" />
    <input type="checkbox" v-model="taskDate.due" />
    <button class="save" @click="saveDates">Save</button>
  </div>
</template>
<script>
import datePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
  name: "dates",
  props: ["task"],
  data() {
    return {
      updatedTask: JSON.parse(JSON.stringify(this.task)),
      date: [],
      taskDate: {
        start: false,
        due: true,
      },
    };
  },
  created() {
    if (this.task.dates.startDate) this.taskDate.start = true;
    if (this.task.dates.dueDate) this.taskDate.due = false;
    this.date[0] = new Date(Date.now());
    // this.date[1] = new Date(Date.now());
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    saveDates() {
      // if(this.date.length === 2){
      //   this.date.sort((a, b) => a - b);
      // }
      if (this.taskDate.due) {
        if (this.taskDate.start) {
          this.updatedTask.dates.startDate = this.date[0];
          this.updatedTask.dates.dueDate = this.date[1];
        } else this.updatedTask.dates.dueDate = this.date[0] > this.date[1] ? this.date[0] : this.date[1]
      } else this.updatedTask.dates.startDate = this.date[1] > this.date[0] ? this.date[1] : this.date[0]
      if (this.taskDate.start) this.updatedTask.dates.startDate = this.date[0];
      if (this.taskDate.due) this.updatedTask.dates.dueDate = this.date[1];
      this.$emit("updateTask", this.updatedTask);
    },
  },
  computed: {},
  components: {
    datePicker,
  },
};
</script>