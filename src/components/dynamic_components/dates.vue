<template>
  <div class="dynamic-dates-edit">
    <button class="close" @click="closeModal">
      <span class="menu-header-close-button"></span>
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
    <transition name="fade">
      <div v-if="isInvalid">Pick start date and due date</div>
    </transition>
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
      isInvalid: false,
    };
  },
  created() {},
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    saveDates() {
      if (this.date.length < 1) {
        if (!this.isInvalid)
          setTimeout(() => {
            this.isInvalid = false;
          }, 2000);
        this.isInvalid = true;
        return;
      }
      console.log(this.date);
      this.updatedTask.dates.startDate = this.date[0];
      this.updatedTask.dates.dueDate = this.date[1];
      this.$emit("updateTask", this.updatedTask);
      this.updatedTask = JSON.parse(JSON.stringify(this.task));
    },
  },
  computed: {},
  components: {
    datePicker,
  },
};
</script>