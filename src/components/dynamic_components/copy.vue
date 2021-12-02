<template>
  <div>
    <button><i class="fas fa-times"></i></button>
    <p>Copy card</p>
    <div>
      <form @submit.prevent="addNewCopy"></form>
      <p>Title</p>
      <textarea type="text"></textarea>
    </div>
    <div>
      <p>Keep...</p>
      <input type="checkbox" />
      <p>Comments(num)</p>
    </div>
    <div>
      <p>Copy to...</p>
      <div>BOARD HERE</div>
      <div>LIST HERE</div>
      <div>POSITION?</div>
    </div>
    <button>Create card</button>
  </div>
</template>
<script>
export default {
  name: "copy",
  methods: {
    addNewCopy() {},
  },
};
</script>