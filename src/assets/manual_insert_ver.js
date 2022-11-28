import data from "./csvjson.json" assert { type: "json" };
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut, 
} from "firebase/auth";

import { doc, setDoc,addDoc,collection, Timestamp,getFirestore } from "firebase/firestore"; 


const firebaseConfig = {
    apiKey: "AIzaSyDtTw4bSJgZ1UEryWnowhv1WTmg0qD-o18",
    authDomain: "csun3d.firebaseapp.com",
    projectId: "csun3d",
    storageBucket: "csun3d.appspot.com",
    messagingSenderId: "847912334753",
    appId: "1:847912334753:web:77c37a72603cd9d498c7e0",
    measurementId: "G-TQQC3BH1Q6"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
/**Loop through data */
for (let i = 0; i < data.length; i++) {
    console.log(i)
    const docData = {
        lat: data[i].lat,
        lon: data[i].lon,
        timestamp: Timestamp.now(),
        title: data[i].Navn,
        from: data[i].Fra,
        to: data[i].Til,
        allDay: data[i].AllDay == "Ja" ? true : false,
        comment: data[i].Kommentar,
        dislikes: 0,
        likes: 0,
        user_likes : [],
    }
     addDoc(collection(db, "RestBar_Verified"), docData);

// await setDoc(doc(db, "Bars_Unverified"), docData);
console.log("Document written with ID: ", i);
}

