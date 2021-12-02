<template>
  <div>
    <button>Delete</button>
    <!-- //DELETE MODAL -->
    <div>
      <p>Delete task?</p>
      <button><i class="fas fa-times"></i></button>
      <p>
        All actions will be removed from the activity feed and you won’t be able
        to re-open the card. There is no undo.
      </p>
      <button>Delete</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "archive",
  methods: {},
};
</script>