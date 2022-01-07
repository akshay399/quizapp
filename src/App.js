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
import quizData from "./components/data/quiz.json";

function App() {
  var database = firebase.database();
  const db = fire.database;
  const [link, setLink] = useState("");
  const [userName, setUserName] = useState("");
  const [uniqueUrl, setUniqueUrl] = useState("");
  useEffect(() => {
    if (uniqueUrl === "") {
      let unique_url = (Math.random() + 1).toString(36).substring(3);
      setUniqueUrl(unique_url);
      console.log("random", unique_url);
      database.ref(`${unique_url}`).set(quizData);
    }
  }, []);
  var currentUrl = window.location.href;
  var tempLink = `${currentUrl}${uniqueUrl}`;
  if (link == "") setLink(tempLink);
  console.log("sharable link", tempLink);
  return (
    <Router>
      <Routes>
        {/* <Home></Home> */}
        <Route path="/" element={<Home setUserName={setUserName} />} />
        <Route
          path="/questions"
          element={
            <Questions userName={userName} uniqueUrl={uniqueUrl} link={link} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
