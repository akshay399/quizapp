import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./components/Home";
import Questions from "./components/questions/Questions";
import React, { useState, useEffect } from "react";
import fire from "./fire";
import firebase from "firebase";

function App() {
  var database = firebase.database();
  const db = fire.database;
  const [userName, setUserName] = useState("");
  return (
    <Router>
      <Routes>
        {/* <Home></Home> */}
        <Route path="/" element={<Home setUserName={setUserName} />} />
        <Route path="/questions" element={<Questions userName={userName} />} />
      </Routes>
    </Router>
  );
}

export default App;
