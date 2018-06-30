<template>
  <div class="col-lg queue">
    <h1>Queue</h1>
    <ul class="list-group">
      <span>
        <li class="list-group-item">
          <u>Emotionless - Drake &emsp; &emsp; shaneieknnedy</u>
        </li>
      </span>
      <span>
        <li class="list-group-item">
          <u>Heartless - Kanye West &emsp; &emsp; govi218</u>
        </li>
      </span>
      <span>
        <li class="list-group-item">
          <u>1985 - J. Cole &emsp; &emsp; germano</u>
        </li>
      </span>
      <span>
        <li class="list-group-item">
          <u>High for this - the weeknd &emsp; &emsp; pepe</u>
        </li>
      </span>
      <span>
        <li class="list-group-item">
          <u>Killuminati - Joey BadA$$ &emsp; &emsp; behrad</u>
        </li>
      </span>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'Queue',
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

.queue {
    border-color: white;
}

h1 {
    color: #1DB954;
    text-align: center;
}
</style>
