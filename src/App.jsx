import React, { useState } from "react";
import { Breadcrumb, Layout, Menu } from "antd";
import { Map, Table, FloatButton, Main, SignIn, SignUp, Home, About, Profile } from "./Components";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import "antd/dist/reset.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./Firebase/firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDtTw4bSJgZ1UEryWnowhv1WTmg0qD-o18",
  authDomain: "csun3d.firebaseapp.com",
  projectId: "csun3d",
  storageBucket: "csun3d.appspot.com",
  messagingSenderId: "847912334753",
  appId: "1:847912334753:web:77c37a72603cd9d498c7e0",
  measurementId: "G-TQQC3BH1Q6"
};
import { Switch, Route, Redirect } from "react-router-dom";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const { Header, Content, Footer } = Layout;

const items = [
  {
    key: "/Home",
    label: "Hjem"
  },
  {
    key: "/Map",
    label: "Map"
  },
  {
    key: "/Om",
    label: "Om"
  }
];

// Initial
const App = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <div className="App">
      <Switch>
        {user ? (
          <Main>
            <Route exact path="/Home" component={Home} />
            <Route exact path="/Map" component={Map} />
            <Route exact path="/Table" component={Table} />
            <Route exact path="/About" component={About} />
            <Route exact path="/Profile" component={Profile} />
            <Redirect from="*" to="/Home" />
          </Main>
        ) : (
          <>
            <Route path="/sign-up" exact component={SignUp} />
            <Route path="/sign-in" exact component={SignIn} />¨
            <Redirect from="*" to="/sign-in" />
          </>
        )}
      </Switch>
    </div>
  );
};

export default App;