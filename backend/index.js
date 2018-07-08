
var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var bodyParser = require('body-parser');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var SpotifyWebApi = require('spotify-web-api-node');
var admin = require("firebase-admin");

var serviceAccount = require('./collabq-f33b8-2a73ed28b3ec.json');

/* CREDENTIALS */

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://collabq-f33b8.firebaseio.com"
});


var spotify_client_id = '186e87b7f394473084091612a45cdf3f';
var spotify_client_secret = '48f0851bf51544d19c1782df41536000';
var spotifyApi = new SpotifyWebApi({
    clientId : spotify_client_id,
    clientSecret : spotify_client_secret,
    redirectUri: 'http://localhost:8888'
});

var db = admin.database();
var app = express();
app.use(bodyParser.json());

/* ROUTES */

app.post('/login', (req, res) => {
    var access_token = req.body.access_token;
    
    var user_key = db.ref().child('users').push().key;
    var updates = {};
    updates['/users/' + user_key + '/' + 'access_token'] = access_token;
    spotifyApi.setAccessToken(access_token);

    // for storing intermediate promise results
    var results = {};

    // start by getting user
    spotifyApi.getMe()
        .then((data) => {
            res.send({
                id: data.body.id,
                access_token: access_token,
                name: data.body.display_name
            })
            results.name = data.body.display_name;
            return data;
        })
        // then create a playlist
        .then((data) => {
            spotifyApi.createPlaylist(data.body.id, data.body.id, {'public': true});
            return data;
        })
        .then((data) => {
            // store playlist id; create songs and collaborators lists
            results.playlistId = data.body.id;
            let collaborators = [];
            collaborators.push(results.name);
            updates['/users/' + user_key + '/' + 'playlist_id'] = results.playlistId;    
            updates['/users/' + user_key + '/' + 'songs'] = [];            
            updates['/users/' + user_key + '/' + 'collaborators'] = collaborators;          
        }).then(() => {
            db.ref().update(updates);
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/playlist',(req, res) => {
    var access_token = req.body.access_token;
    spotifyApi.setAccessToken(access_token);
    spotifyApi.getPlaylist(req.id, req.id)
        .then((data) => {
            console.log(data.body.tracks);
            res.send({
                tracks: data.body.tracks
            });
        });
});

app.get('/search', (req,res,next) => {
    let results = [];
    let toSearch = req.query.search;
    spotifyApi.setAccessToken(req.query.AT);
    spotifyApi.searchTracks(toSearch)
        .then(r => {
            r.body.tracks.items.forEach(song => {
                let ars = [];
                song.artists.forEach(artist => {
                    ars.push(artist.name);
                });
                results.push({
                    name: song.name,
                    artist: ars.join(', '),
                    id: song.id
                });
            });
            res.send(results);
        }).catch( err => {
            console.log(err);
        });
})

app.listen(8888, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Listening on port 8888!');
    }
});
