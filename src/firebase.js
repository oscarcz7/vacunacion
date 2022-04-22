import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDoQyz2KMXDLTZkxRdTFvsWhdjf6uESlB0",
  authDomain: "vacunacion-5faf5.firebaseapp.com",
  projectId: "vacunacion-5faf5",
  storageBucket: "vacunacion-5faf5.appspot.com",
  messagingSenderId: "452358376125",
  appId: "1:452358376125:web:6cef01dcb347daf6e4c5d4",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const auth = firebase.auth();
export { firestore, auth };