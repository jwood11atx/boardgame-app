const firebase = require("firebase");

const config = {
  apiKey: "AIzaSyClAhS9lvKSElVkGHRv3tKecMylzARFSRg",
  authDomain: "boardgame-it.firebaseapp.com",
  databaseURL: "https://boardgame-it.firebaseio.com",
  storageBucket: "boardgame-it.appspot.com",
  messagingSenderId: "253339937377"
};
firebase.initializeApp(config);

const fbdb = firebase.database();

module.exports = {firebase, fbdb};
