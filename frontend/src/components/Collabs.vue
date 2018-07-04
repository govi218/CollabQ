<template>
  <div class="col- collabs">
    <h1>Collabs</h1>
    <ul class="list-group">
      <span v-for="(collab, i) in collabs" :key="i">
        <li class="list-group-item">
          <u>{{collab}}</u>
        </li>
      </span>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Collabs',
    props: ['collabs'],
    data() {
      return {
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
