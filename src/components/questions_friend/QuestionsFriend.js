import "./Questions.css";
import React, { useState, useEffect } from "react";
import "bulma/css/bulma.min.css";

import quizData from "../data/quiz.json";
import QuestionFriend from "./QuestionFriend";
import EndFriend from "./EndFriend";
import ModalFriend from "./ModalFriend";
// import StartFriend from "./StartFriend";
import database from "../../fire";
let interval;

var choicesArray = [];
var firebaseIndx = -1;
function QuestionsFriend({
  uniqueUrl,
  dataFirebaseArray,
  questionNamem,
  name,
}) {
  const [step, setStep] = useState(2);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    // console.log("did username reach here not friend", questionName.name);

    if (step === 3) {
      clearInterval(interval);
    }
  }, [step]);
  const quizStartHandler = () => {
    setStep(2);
    interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const resetClickHandler = () => {
    setActiveQuestion(0);
    setAnswers([]);
    setStep(2);
    setTime(0);
    interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };
  return (
    <div className="App">
      {/* {step === 1 && (
        <StartFriend userName={userName} onQuizStart={quizStartHandler} />
      )} */}
      {step === 2 && (
        <QuestionFriend
          uniqueUrl={uniqueUrl}
          data={quizData.data[activeQuestion]}
          onAnswerUpdate={setAnswers}
          numberOfQuestions={quizData.data.length}
          activeQuestion={activeQuestion}
          onSetActiveQuestion={setActiveQuestion}
          onSetStep={setStep}
          dataFirebaseArray={dataFirebaseArray}
        />
      )}
      {step === 3 && (
        <EndFriend
          name={name}
          results={answers}
          data={quizData.data}
          onReset={resetClickHandler}
          onAnswersCheck={() => setShowModal(true)}
          time={time}
          dataFirebaseArray={dataFirebaseArray}
          uniqueUrl={uniqueUrl}
        />
      )}

      {/* {showModal && (
        <ModalFriend
          onClose={() => setShowModal(false)}
          results={answers}
          data={quizData.data}
        />
      )} */}
    </div>
  );
}

export default QuestionsFriend;
