// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByVEuKMyvauv-jPrL72AyvslsBuC8OEjA",
  authDomain: "crud-4a958.firebaseapp.com",
  databaseURL: "https://crud-4a958-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "crud-4a958",
  storageBucket: "crud-4a958.appspot.com",
  messagingSenderId: "1040281700841",
  appId: "1:1040281700841:web:c75b4fe90a47d0831c6378",
  measurementId: "G-PBFJQ3XG69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);