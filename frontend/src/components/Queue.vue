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
  import axios from 'axios'
  export default {
    name: 'Queue',
    data() {
        return {
            queue: [],
        }
    },
    methods: {
        updateQueue() {
            const AT = this.$route.path.substring(10);
            axios.post('/api/playlist', {id: AT.split('-')[0], access_token: AT.split('-')[1]}).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            });
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
