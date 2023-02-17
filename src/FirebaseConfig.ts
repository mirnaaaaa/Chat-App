import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyC_H_Jf70oW6tY2Ua7Sg5KMdybVV4mzNeQ",
  authDomain: "chatstore-abe65.firebaseapp.com",
  projectId: "chatstore-abe65",
  storageBucket: "chatstore-abe65.appspot.com",
  messagingSenderId: "301090209901",
  appId: "1:301090209901:web:2b2a23b4843f8420367f64",
  measurementId: "G-N3KWCX1M2P"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app)
const analytics = getAnalytics(app);