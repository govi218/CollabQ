
var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var bodyParser = require('body-parser');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var SpotifyWebApi = require('spotify-web-api-node');
var firebase = require('firebase');

var spotify_client_id = '186e87b7f394473084091612a45cdf3f';
var spotify_client_secret = '48f0851bf51544d19c1782df41536000';

var config = {
    apiKey: "AIzaSyDktyjbfU8F8MOCmJs0WycgeHH0DGkggTc",
    authDomain: "collabq-f33b8.firebaseapp.com",
    databaseURL: "https://collabq-f33b8.firebaseio.com",
    storageBucket: "collabq-f33b8.appspot.com",
};

firebase.initializeApp(config);

var db = firebase.database();

var app = express();
app.use(bodyParser.json());
app.post('/login', (req, res) => {
    var access_token = req.body.access_token;
    
    var user_key = db.ref().child('users').push().key;
    var updates = {};
    updates['/users/' + user_key + '/' + 'access_token'] = access_token;

    var spotifyApi = new SpotifyWebApi({
        clientId : spotify_client_id,
        clientSecret : spotify_client_secret,
        redirectUri: 'http://localhost:8888'
    });

    spotifyApi.setAccessToken(access_token);

    // for storing intermediate promise results
    var results = {};

    // start by getting user
    spotifyApi.getMe()
        .then(function(data) {
            console.log(data);
            res.send({
                id: data.body.id,
                access_token: access_token,
                name: data.body.display_name
            })
            return data.body.id
        })
        .then((id) => {
            spotifyApi.createPlaylist(id, id, {'public': true});
        })
        .then(function(data){
            // get top tracks and store created playlist id
            results.playlistId = data.body.id;
            console.log(results.playlistId);
            updates['/users/' + user_key + '/' + 'playlist_id'] = results.playlistId;          
        })
        .catch(err => {
            console.log(err);
        });
    db.ref().update(updates);
});

app.get('/playlist',(req, res) => {
    var access_token = req.body.access_token;
    var spotifyApi = new SpotifyWebApi({
        clientId : spotify_client_id,
        clientSecret : spotify_client_secret,
        redirectUri: 'http://localhost:8888'
    });

    spotifyApi.setAccessToken(access_token);
    spotifyApi.getPlaylist(req.id, req.id)
        .then((data) => {
            console.log(data.body.tracks);
            res.send({
                tracks: data.body.tracks
            });
        });
});

console.log('Listening on 8888');
app.listen(8888);
