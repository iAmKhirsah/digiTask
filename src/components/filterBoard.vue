<template>
  <div class="filter-container">
    <div>
      <p>Keyword</p>
      <input
        type="text"
        v-model="filterBy.title"
        placeholder="Enter a keyword..."
      />
    </div>
    <div>
      <p>Members</p>
      <label>
        <input type="checkbox" />
        <div>
          placeholder img
          <p>No members</p>
        </div>
      </label>
      <label>
        <input type="checkbox" />
        <div>
          <img :src="currUser.imgUrl" />
          <p>Cards assigned to me</p>
        </div>
      </label>
      <label>
        <input type="checkbox" />
        <div>
          <select>
            <option
              v-for="member in board.members"
              :key="member._id"
              :value="member._id"
            >
              <span>
                <img :src="member.imgUrl" />
                <p>{{ member.fullname }}</p>
                <p>@{{ member.username }}</p>
              </span>
            </option>
          </select>
        </div>
      </label>
    </div>
    <div>
      <p>Due date</p>
      <label>
        <input type="checkbox" />
        <p>No dates</p>
      </label>
      <label>
        <input type="checkbox" />
        <p>Overdue</p>
      </label>
      <label>
        <input type="checkbox" />
        <p>Due in the next day</p>
      </label>
    </div>
    <div>
      <p>Labels</p>
      <label v-for="label in board.labels" :key="label.id">
        <input type="checkbox" />
      </label>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      filterBy: {
        title: "",
      },
    };
  },
};
</script>