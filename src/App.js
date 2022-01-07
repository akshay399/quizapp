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
import NameInputFriend from "./components/name_input_friend/NameInputFriend";

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
     
    }
  }, []);
  
  return (
    <Router>
      <Routes>
        {/* <Home></Home> */}
        <Route path="/" element={<Home setUserName={setUserName} uniqueUrl = {uniqueUrl} quizData = {quizData} setLink = {setLink}/>} />
       
        <Route
          path="/questions"
          element={
            <Questions userName={userName} uniqueUrl={uniqueUrl} link={link}  />
          }
        />

<Route
          path="/quiz/:code"
          element={
            <NameInputFriend  />
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
