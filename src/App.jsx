import React from "react";
import { Layout } from "antd";
import { Map, Main } from "./Components";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import "antd/dist/reset.css";

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

const App = () => {
  
  return (
    <div className="App">
      <Main>
        <Map />
      </Main>
    </div>
  );
};

export default App;