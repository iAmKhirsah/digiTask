<template>
  <div class="dynamic-dates-edit">
    <button class="close" @click="closeModal"><i class="fas fa-times"></i></button>
    <div class="header-layout">
      <header>Dates</header>
    </div>
    <div class="time-picker">
      <date-picker
        class="test"
        v-model="date"
        type="date"
        range
        inline
        placeholder="Select date range"
      ></date-picker>
    </div>
    <button class="save">Save</button>
  </div>
</template>
<script>
import datePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
  name: "dates",
  data() {
    return {
      date: [],
    };
  },
  methods:{
  closeModal() {
     
      this.$emit("closeModal");
    },
  },
  computed: {},
  components: {
    datePicker,
  },
};
</script>