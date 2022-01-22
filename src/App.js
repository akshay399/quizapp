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
import QuestionsFriend from "./components/questions_friend/QuestionsFriend";
function App() {
  const [uniqueUrl, setUniqueUrl] = useState();
  var database = firebase.database();
  const db = fire.database;
  const [link, setLink] = useState("");
  const [userName, setUserName] = useState("");
  const [dataFirebaseArray, setDataFirebaseArray] = useState([]);
  const [questionName, setQuestionName] = useState("");
  const [name, setName] = useState("");
  const [step, setStep] = useState(3);
  const [score, setScore] = useState([]);

  const passUniqueUrl = (temp) => {
    console.log("in app passUniqueUrl funct: ", temp);

    setUniqueUrl(temp);
    return temp;
  };
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setStep={setStep}
              setUniqueUrl={setUniqueUrl}
              passUniqueUrl={passUniqueUrl}
              setUserName={setUserName}
              setQuestionName={setQuestionName}
              uniqueUrl={uniqueUrl}
              quizData={quizData}
              setLink={setLink}
            />
          }
        />

        <Route
          path="/questions"
          element={
            <Questions
              setScore={setScore}
              score={score}
              setLink={setLink}
              setStep={setStep}
              step={step}
              passUniqueUrl={passUniqueUrl}
              userName={userName}
              uniqueUrl={uniqueUrl}
              link={link}
            />
          }
        />

        <Route
          path="/quiz/:code"
          element={
            <NameInputFriend
              setName={setName}
              name={name}
              setDataFirebaseArray={setDataFirebaseArray}
            />
          }
        />
        <Route
          path="/quiz/:code/questions"
          element={
            <QuestionsFriend
              name={name}
              userName={userName}
              questionName={questionName}
              dataFirebaseArray={dataFirebaseArray}
              uniqueUrl={uniqueUrl}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
