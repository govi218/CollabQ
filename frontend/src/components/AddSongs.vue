<template>
  <div class="col-lg add-song">
    <div class="container">
        <h1>Add Song</h1>
        <form class="form-inline container">
            <input class="form-control" type="search" placeholder="Search" aria-label="Search" v-model="query">
            <button class="btn" @click="search()">Search</button>
        </form>
        <div class="container results">
            <ul class="list-group">
                <div class='search-results'  v-for="(song,i) in searchSongs" :key="i">
                    <div class="row">
                        <div class="col-8">
                            <li class="list-group-item">{{song.name}} - {{song.artist}}</li>
                        </div>
                        <div class="col-2">
                            <button class="btn" @click="addSong(i)">Add</button>
                        </div>
                    </div>
                </div>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    name: 'AddSongs',
    props: ['queue', 'username', 'AT'],
    data() {
        return {
            searchSongs: [
            ],
            query: ''
        }
    },
    methods: {
        addSong(index) {
            //this is just for show right now...
            this.$emit('addSong', {song: this.searchSongs[index]})

            //the way this should work is that i call back to the back end to add this song to the playlist, the backend adds the song to the playlist and updates firebase
            //then my firebase listener on the frontend will update the queue component
        },
        search() {
            //make call to back end to return all songs matching the search input
            axios.get('/api/search', {params: {search: this.query, AT: this.AT}})
                .then(res => {
                    this.searchSongs = res.data;
                }).catch(err => {
                    console.log(err);
                });
        }
    }
  }

</script>

<style>
.form-inline {
    justify-content: center;
    margin: 0 auto;
    text-align: center;
}
.results {
    margin-top: 15px;
}
.add-song {
    align-content: center;
}
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

.container .list-group .search-results .list-group-item {
    display: inline-block;
}
</style>
