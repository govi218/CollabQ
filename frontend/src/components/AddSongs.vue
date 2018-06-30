<template>
  <div class="col-sm add-song">
    <h1>Add Song</h1>
    <form class="form-inline">
      <input class="form-control" type="search" placeholder="Search" aria-label="Search">
      <button class="btn">Search</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'AddSongs',
    data() {
        return {

        }
    }
  }

</script>

<style>
.add-song .btn {
    background-color: #1DB954;
    color: white;
}

.collabs .list-group .list-group-item {
    align-content: center;
    text-align: center;
}

.form-control {
    margin: 5px;
}
</style>
