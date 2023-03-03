import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDB448o1iufh5YymelxG9tGDEwUTWnVwMI",
  authDomain: "chat-d81fe.firebaseapp.com",
  projectId: "chat-d81fe",
  storageBucket: "chat-d81fe.appspot.com",
  messagingSenderId: "1026406564826",
  appId: "1:1026406564826:web:c3dc06b225f8c94ee8b6e3",
  measurementId: "G-Z9ECPS3K34"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app)

