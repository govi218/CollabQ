<template>
  <div class="card container login" style="width: 18rem;">
    <div class="card-body container">
      <h5 class="card-title">Spotify Login</h5>
      <h6 class="card-subtitle mb-2 text-muted">To create a CollabQ, please log in with your spotify username and password</h6>
      <form @submit='getSpotifyAuth' class="container" >
        <button type="submit" class="btn btn-primary" @click='getSpotifyAuth'>Log in with Spotify</button>
      </form>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'Login',
    data() {
      return {
      }
    },
    methods: {
        getSpotifyAuth() {
            // Get the hash of the url
            const hash = window.location.hash
            .substring(1)
            .split('&')
            .reduce(function (initial, item) {
            if (item) {
                var parts = item.split('=');
                initial[parts[0]] = decodeURIComponent(parts[1]);
            }
            return initial;
            }, {});
            window.location.hash = '';

            // Set token
            let _token = hash.access_token;

            const authEndpoint = 'https://accounts.spotify.com/authorize';

            // Replace with your app's client ID, redirect URI and desired scopes
            var spotify_client_id = '186e87b7f394473084091612a45cdf3f';
            var spotify_client_secret = '48f0851bf51544d19c1782df41536000';
            const redirectUri = 'http://localhost:8080/';
            const scopes = ['user-read-private user-read-email user-library-read',
  ' user-follow-read user-read-recently-played user-read-currently-playing',
' user-top-read playlist-modify-public playlist-read-private playlist-modify-private'];

            // If there is no token, redirect to Spotify authorization
            if (!_token) {
                window.location = `${authEndpoint}?client_id=${spotify_client_id}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token`;
            }
        }
    }
  }
</script>

<style>
.login {
    margin-top: 20px;
}

.btn {
    background-color: #1DB954;
    border-color: #1DB954;
}

.btn:hover {
    background-color: #1DB954;
    border-color: #1DB954;
}

</style>
