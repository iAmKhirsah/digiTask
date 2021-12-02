<template>
  <div>
    <button><i class="fas fa-times"></i></button>
    <p>Dates</p>
    <input type="date" />
    <p>Start date</p>
    <input type="checkbox" />
    <p>Due date</p>
    <input type="checkbox" />
    <p>Set due date reminder</p>
    <select></select>
    <button>Save</button>
    <button>Remove</button>
  </div>
</template>
<script>
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
export default {
  name: "dates",
};
</script>