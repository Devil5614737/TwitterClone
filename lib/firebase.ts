import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBUyZyivZAaB1xx_qWxE_9ouwWDmnionE0",
  authDomain: "twitter-clone-9ae10.firebaseapp.com",
  projectId: "twitter-clone-9ae10",
  storageBucket: "twitter-clone-9ae10.appspot.com",
  messagingSenderId: "175514700078",
  appId: "1:175514700078:web:36a61b0d088b5269ac92bf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();
