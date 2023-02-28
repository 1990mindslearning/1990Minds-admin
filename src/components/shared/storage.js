import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCMgv6yO7nIU0MUqbUhpUVZAgZxOsi8vz4",
  authDomain: "minds-6da65.firebaseapp.com",
  projectId: "minds-6da65",
  storageBucket: "minds-6da65.appspot.com",
  messagingSenderId: "741144632721",
  appId: "1:741144632721:web:f13f966f1a36f039ec8e30"
};

firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();

export default storage;