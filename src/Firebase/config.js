
import { initializeApp } from "firebase/app";
import  {getFirestore} from "firebase/firestore"


const firebaseConfig = {
  // apiKey: "AIzaSyD4llNAwIiaq9_ou7H_ycDgLJI83aW_Fm4",
  // authDomain: "docsapp-da883.firebaseapp.com",
  // projectId: "docsapp-da883",
  // storageBucket: "docsapp-da883.appspot.com",
  // messagingSenderId: "701046147494",
  // appId: "1:701046147494:web:3efd3e78652bb22b376767"
  apiKey: "AIzaSyBa0wCkEeFz6Acqk6EMj_dXCAZraZ7QqGY",
  authDomain: "doctask-c6bad.firebaseapp.com",
  projectId: "doctask-c6bad",
  storageBucket: "doctask-c6bad.appspot.com",
  messagingSenderId: "927004780158",
  appId: "1:927004780158:web:2448a46a63a7690aa05a2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)