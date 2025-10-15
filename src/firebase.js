import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXqpiU_B84au7e3oU2vERv5hmOS9oUUsY",
  authDomain: "torneo-robotica-883da.firebaseapp.com",
  projectId: "torneo-robotica-883da",
  storageBucket: "torneo-robotica-883da.firebasestorage.app",
  messagingSenderId: "937210435031",
  appId: "1:937210435031:web:669526df6a9a7d3077a792"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);