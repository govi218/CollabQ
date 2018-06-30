
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
app.use(express.bodyParser());

app.post('/login', (req, res) => {
    var access_token = req.code;
    res.send({
        data: 'ok'
    })
    /*// var user_ref = db.ref('users');
    var user_key = db.ref().child('users').push().key;
    var updates = {};
    updates['/users/' + user_key + '/' + 'access_token'] = access_token;

    var spotifyApi = new SpotifyWebApi({
        clientId : spotify_client_id,
        clientSecret : spotify_client_secret
    });

    spotifyApi.setAccessToken(access_token);

    // start by getting user
    spotifyApi.getMe()
        .then(function(data) {
        console.log(data.body);
    });

    db.ref().update(updates);*/
});

// app.use(express.static(__dirname + '../frontend'))
//    .use(cookieParser());

// app.get('/login', function(req, res) {

//   var state = generateRandomString(16);
//   res.cookie(stateKey, state);

//   // application requests authorization
//   var scope = 'user-read-private user-read-email user-library-read' + 
//   ' user-follow-read user-read-recently-played user-read-currently-playing' + 
//   ' user-top-read playlist-modify-public playlist-read-private playlist-modify-private';

//   res.redirect('https://accounts.spotify.com/authorize?' +
//     querystring.stringify({
//       response_type: 'code',
//       client_id: spotify_client_id,
//       scope: scope,
//       redirect_uri: redirect_uri,
//       state: state
//     }));
// });

app.get('/callback', function(req, res) {

    // application requests refresh and access tokens
    // after checking the state parameter

    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
            error: 'state_mismatch'
        }));
    } else {
        res.clearCookie(stateKey);
        var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
        },
        headers: {
        'Authorization': 'Basic ' + (new Buffer(spotify_client_id + ':' + spotify_client_secret).toString('base64'))
        },
        json: true
        };

        request.post(authOptions, function(error, response, body) {
            if (!error && response.statusCode === 200) {

                var access_token = body.access_token,
                refresh_token = body.refresh_token;

                var exec = require('child_process').exec;

                var spotifyApi = new SpotifyWebApi({
                    clientId : 'fcecfc72172e4cd267473117a17cbd4d',
                    clientSecret : 'a6338157c9bb5ac9c71924cb2940e1a7',
                    redirectUri : 'http://www.example.com/callback'
                });

                spotifyApi.setAccessToken(access_token);

                // for storing intermediate promise results
                var results = {};

                // start by getting user
                spotifyApi.getMe()
                    .then(function(data) {
                    console.log(data.body);
                });

                // we can also pass the token to the browser to make requests from there
                res.redirect('/#' +
                    querystring.stringify({
                    access_token: access_token,
                    refresh_token: refresh_token
                }));
            } else {
                res.redirect('/#' +
                    querystring.stringify({
                    error: 'invalid_token'
                }));
            }
        });
    }
});


// /** Stuff from Spotify API documentation */

// app.get('/refresh_token', function(req, res) {

//   // requesting access token from refresh token
//   var refresh_token = req.query.refresh_token;
//   var authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
//     form: {
//       grant_type: 'refresh_token',
//       refresh_token: refresh_token
//     },
//     json: true
//   };
//   request.post(authOptions, function(error, response, body) {
//     if (!error && response.statusCode === 200) {
//       var access_token = body.access_token;
//       res.send({
//         'access_token': access_token
//       });
//     }
//   });
// });

// /**
//  * Generates a random string containing numbers and letters
//  * @param  {number} length The length of the string
//  * @return {string} The generated string
//  */
// var generateRandomString = function(length) {
//   var text = '';
//   var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//   for (var i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// };

console.log('Listening on 8888');
app.listen(8888);
