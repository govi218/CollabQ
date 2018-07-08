import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyDktyjbfU8F8MOCmJs0WycgeHH0DGkggTc",
    authDomain: "collabq-f33b8.firebaseapp.com",
    databaseURL: "https://collabq-f33b8.firebaseio.com",
    projectId: "collabq-f33b8",
    storageBucket: "collabq-f33b8.appspot.com",
    messagingSenderId: "551740594103"
  };
const db = firebase.initializeApp(config);
export default db.database();