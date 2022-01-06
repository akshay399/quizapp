import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyARSAVZPCmIFika9hmfGgU-9LVn_PF49XM",
  authDomain: "quiz-app-a71d0.firebaseapp.com",
  databaseURL: "https://quiz-app-a71d0-default-rtdb.firebaseio.com",
  projectId: "quiz-app-a71d0",
  storageBucket: "quiz-app-a71d0.appspot.com",
  messagingSenderId: "235939959901",
  appId: "1:235939959901:web:17ca9c24188b9e228429b4",
  measurementId: "G-2SQGDL1SWW",
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

export default database;
