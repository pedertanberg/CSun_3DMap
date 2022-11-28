import React, { useRef, useEffect } from "react";
import { Map, Navbar, Table, FloatButton } from "./Components";
import "./App.css";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
      <div className="">
        <Navbar />
        <Map />
      </div>
      <FloatButton />
    </div>
    {/* <Map /> */}
  </>
);

export default App;
