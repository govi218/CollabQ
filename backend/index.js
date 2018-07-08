
const express = require('express'); // Express web server framework
const request = require('request'); // "Request" library
const bodyParser = require('body-parser');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const SpotifyWebApi = require('spotify-web-api-node');
const admin = require("firebase-admin");

const serviceAccount = require('./collabq-f33b8-2a73ed28b3ec.json');

/* CREDENTIALS */

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://collabq-f33b8.firebaseio.com"
});


const spotify_client_id = '186e87b7f394473084091612a45cdf3f';
const spotify_client_secret = '48f0851bf51544d19c1782df41536000';
const spotifyApi = new SpotifyWebApi({
    clientId : spotify_client_id,
    clientSecret : spotify_client_secret,
    redirectUri: 'http://localhost:8888'
});

const db = admin.database();
const app = express();
app.use(bodyParser.json());

/* ROUTES */

app.post('/login', (req, res) => {
    const access_token = req.body.access_token;
    let user_key = db.ref().child('users').push().key;
    let updates = {};
    updates['/users/' + user_key + '/' + 'access_token'] = access_token[0];
    updates['/users/' + user_key + '/' + 'user_key'] = user_key;
    spotifyApi.setAccessToken(access_token);

    // for storing intermediate promise results
    let results = {};

    // start by getting user
    spotifyApi.getMe()
        .then((data) => {
            console.log(access_token);
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
            return spotifyApi.createPlaylist(data.body.id, data.body.id, {'public': true});
        })
        .then((data) => {
            // store playlist id; create collaborators list
            console.log(data.body);
            results.playlistId = data.body.id;
            let collaborators = [];
            collaborators.push(results.name);
            updates['/users/' + user_key + '/' + 'playlist_id'] = results.playlistId;
            updates['/users/' + user_key + '/' + 'name'] = results.name; 
            updates['/users/' + user_key + '/' + 'collaborators'] = collaborators;          
        }).then(() => {
            db.ref().update(updates);
        })
        .catch(err => {
            console.log(err);
        });
});

app.post('/add_songs', (req, res) => {
    // get req data
    const access_token = req.body.access_token;
    let updates = {};
    let songs = [];
    songs.push(req.body.song);

    console.log(access_token);

    // initialize api
    spotifyApi.setAccessToken(access_token);
    db.ref('users').orderByChild('access_token').equalTo(access_token)
        .then((snapshot) => {
            return snapshot.val();
        })
        .then((user) => {{
            // add song to playlist
            let results = [];
            spotifyApi.getMe()
                .then((data) => {
                    return spotifyApi.addTracksToPlaylist(data.body.id, user.playlist_id, songs);
                })
                .then((data) => {
                    console.log(data);
                    if (user.songs !== null || user.songs != undefined) {
                        songs = user.songs;
                        songs.push(req.body.songs);
                        console.log(songs);
                    }

                    updates['/users/' + user.user_key + '/' + 'songs'] = songs; 
                    db.ref().update(updates);
                })
                .catch((err) => {
                    console.log('Error: ' + err);
                });
        }})    
});

app.get('/playlist',(req, res) => {
    const access_token = req.body.access_token;
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
