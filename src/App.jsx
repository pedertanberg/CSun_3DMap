import React, { useRef, useEffect } from "react";
import { Map, Navbar, Table } from "./Components";
import "./App.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtTw4bSJgZ1UEryWnowhv1WTmg0qD-o18",
  authDomain: "csun3d.firebaseapp.com",
  projectId: "csun3d",
  storageBucket: "csun3d.appspot.com",
  messagingSenderId: "847912334753",
  appId: "1:847912334753:web:77c37a72603cd9d498c7e0",
  measurementId: "G-TQQC3BH1Q6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initial
const App = () => (
  <>
    <div className="App">
      <div className="gradient__bg">
        <Navbar />
      </div>
    </div>
    <Map />
  </>
);

export default App;
