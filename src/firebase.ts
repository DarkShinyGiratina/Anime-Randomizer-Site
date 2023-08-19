// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getAuth } from "firebase/auth";
import * as firebaseui from "firebaseui";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBxEQ9HT_PiHiDBydt0kVOu2RziVr3jyow",
  authDomain: "auth.darkshinygira.com",
  projectId: "anime-randomizer-a5d2f",
  storageBucket: "anime-randomizer-a5d2f.appspot.com",
  messagingSenderId: "843964247253",
  appId: "1:843964247253:web:3a8005e613ceb84e49c65c",
  measurementId: "G-MP5VWQ34NM",
};

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDb = getDatabase();
export const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
