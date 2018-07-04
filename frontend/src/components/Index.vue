<template>
  <div class="container index">
    <h1>{{playlistName}}</h1>
      <div class="input-group mb-3 username container">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon3">Username</span>
        </div>
        <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" placeholder="Choose a username" v-model='userName'>
      </div>
      <p v-if="feedback" class='feedback'>{{feedback}}</p>
    <div class="subIndex">
        <div class="row">
          <Queue :queue="queue"></Queue>
          <Collabs :collabs="collabs"></Collabs>
          <AddSongs :queue="queue" :AT="AT" @addSong="addSong"></AddSongs>
        </div>
      </div>
  </div>
</template>

<script>
  import Queue from '@/components/Queue'
  import Collabs from '@/components/Collabs'
  import AddSongs from '@/components/AddSongs'
  export default {
    name: 'Index',
    data() {
      return {
        queue: [
                {
                    name: 'Thank me now',
                    artist:'Drake',
                    adder: 'Shane'
                },
                {
                    name: 'Rigamortus',
                    artist: 'Kendrick Lamar',
                    adder: 'Govind'
                },
                {
                    name: 'Emotionless',
                    artist: 'Drake',
                    adder: 'Connor'
                }
            
            ],
        collabs: ['Shane', 'Govind', 'Connor'],
        playlistName: "Shane's Collaborative Playlist",
        userName: '',
        feedback: null,
        AT: ''
      }
    },
    created() {
      //get playlist from backend
      //update songs, update collaborators
      let url = window.location.hash.split('-');
      url.shift();
      this.AT = url.join('-').split('&')[0];
    },
    components: {
      Queue,
      Collabs,
      AddSongs
    },
    methods: {
      addSong(data) {
        if (!this.userName) {
          this.feedback = 'You must provide a username before you can add songs';
          return;
        } else {
          this.feedback = null;
          this.queue.push({name: data.song.name, artist: data.song.artist, adder: this.userName});
          if (this.collabs.indexOf(this.userName) == -1) {
            this.collabs.push(this.userName);
          }
        }
      }
      //TODO: set up firebase listener for db updates
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.subIndex {
    margin-top: 60px;
}

.index {
  margin-top: 30px;
}

.container .username {
  background: black;
  color: white;
}

.username {
  width: 30%;
}

.input-group-text {
  background: black;
  color: white;
  border-color: black;
}

.username .form-control {
  background: black;
  color: white;
  border-color: black;

}

.feedback {
  color: red;
  text-align: center;
}
</style>
