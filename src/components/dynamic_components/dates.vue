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
        valueType="format"
        range
        inline
        placeholder="Select date range"
      ></date-picker>
    </div>
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
    };
  },
  created() {
    this.date[0] = new Date(Date.now());
    this.date[1] = new Date(Date.now())
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    saveDates() {
      console.log(this.date);
      this.updatedTask.dates.startDate = this.date[0];
      this.updatedTask.dates.dueDate = this.date[1];
      this.$emit("updateTask", this.updatedTask);
    },
  },
  computed: {},
  components: {
    datePicker,
  },
};
</script>