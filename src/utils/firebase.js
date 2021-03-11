import firebase from "firebase/app"
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBzU1m8WTVYCQm6hUfPVWNJLhYajK6F-1c",
    authDomain: "lms-app-610dc.firebaseapp.com",
    projectId: "lms-app-610dc",
    storageBucket: "lms-app-610dc.appspot.com",
    messagingSenderId: "1021272551074",
    appId: "1:1021272551074:web:f2474d31b6dcad6664b1fb"
  };
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);
  //exporter notre base de donnees 
  export default fireDB;
  //export the auth app
  export const auth = app.auth();
