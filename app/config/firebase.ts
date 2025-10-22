// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbJlaZSIYRFqPbSBabAMa-2jUsuqk8n9k",
  authDomain: "torneo-robotica-inacap-2025.firebaseapp.com",
  projectId: "torneo-robotica-inacap-2025",
  storageBucket: "torneo-robotica-inacap-2025.firebasestorage.app",
  messagingSenderId: "1052410301611",
  appId: "1:1052410301611:web:379daf8e892f6bfdbe7bee",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
