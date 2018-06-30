<template>
  <div class="col-sm collabs">
    <h1>Collabs</h1>
    <ul class="list-group">
      <span>
        <li class="list-group-item">
          <u>shaneikennedy</u>
        </li>
      </span>
      <span>
        <li class="list-group-item">
          <u>govi218</u>
        </li>
      </span>
      <span>
        <li class="list-group-item">
          <u>germano</u>
        </li>
      </span>
      <span>
        <li class="list-group-item">
          <u>pepe</u>
        </li>
      </span>
      <span>
        <li class="list-group-item">
          <u>behrad</u>
        </li>
      </span>

    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Collabs',
    data() {
      return {
          collabs: []
      }
    }
  }

</script>

<style>
.list-group-item{
    background: black;
    color: white;
}

.list-group-item:hover {
    color: #1DB954;
}

.collabs {
    border-color: white;
}

h1 {
    color: #1DB954;
    text-align: center;
}
</style>
