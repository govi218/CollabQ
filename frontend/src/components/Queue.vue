<template>
  <div class="col-lg queue">
    <h1>Queue</h1>
    <ul class="list-group">
      <span v-for="(song,i) in queue" :key="i">
        <li class="list-group-item">
          <u>{{song.name}} - {{song.artist}} &emsp; &emsp; {{song.adder}}</u>
        </li>
      </span>

    </ul>
  </div>
</template>

<script>
  import SpotifyWebApi from 'spotify-web-api-node'
  export default {
    name: 'Queue',
    data() {
        return {
            queue: [],
            spotify: null,
            code: ''
        }
    },
    methods: {
        updateQueue() {
            
        }
    },
    created() {
        this.updateQueue();
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
