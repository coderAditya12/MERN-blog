// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blogtalk-af3bf.firebaseapp.com",
  projectId: "blogtalk-af3bf",
  storageBucket: "blogtalk-af3bf.appspot.com",
  messagingSenderId: "459459471710",
  appId: "1:459459471710:web:58c2e6b1dab3101bb507cf",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

