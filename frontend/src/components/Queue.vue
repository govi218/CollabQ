<template>
  <div class="col-lg queue">
    <h1>Queue</h1>
    <ul class="list-group list-inline">
        <li class="list-group-item" v-for="(song,i) in queue" :key="i">
          <u>{{song.name}} - {{song.artist}} &emsp; &emsp; {{song.adder}}</u>
        </li>
    </ul>
  </div>
</template>

<script>
  import SpotifyWebApi from 'spotify-web-api-node'
  import axios from 'axios'
  export default {
    name: 'Queue',
    props: ['queue'],
    data() {
        return {
        }
    },
    methods: {
        updateQueue() {
            /*const AT = this.$route.path.substring(10);
            axios.post('/api/playlist', {id: AT.split('-')[0], access_token: AT.split('-')[1]}).then(res => {
                //we get the whole playlist back, but we want it too look like a queue. so, filter all songs prior to the currently playing song
                queue = res.data.playlist;
                let i = 0;
                while (queue[i] != res.data.currentlyPlaying){
                    queue.pop(0);
                }
            }).catch(err => {
                console.log(err);
            });*/
        }
    },
    created() {
        this.updateQueue();
    }
  }

</script>

<style>
.list-group {
    text-align: center;
    justify-content: center;
    display: flex;
}
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
