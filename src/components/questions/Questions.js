import "./Questions.css";
import React, { useState, useEffect } from "react";
import "bulma/css/bulma.min.css";

import quizData from "../data/quiz.json";
import Question from "./Question";
import End from "./End";
import Modall from "./Modall";
import Start from "./Start";
import database from "../../fire";
let interval;

function Questions({
  userName,
  uniqueUrl,
  link,
  passUniqueUrl,
  setUploadedOptions,
  setStep,
  step,
  setLink,
  setScore,
  score,
}) {
  // const [step, setStep] = useState();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState(0);
  console.log("in questions", score);
  const quizStartHandler = () => {
    setStep(2);
    interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const resetClickHandler = () => {
    setAnswers([]);
    setStep(2);
    setTime(0);
    interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };
  const onAnswersCheck = () => {
    setShowModal(true);
    setScore(score);
    console.log("on click of check score", score);
    // setScore([1, 2, 3, 4]);
  };
  return (
    <div className="App">
      {step === 1 && (
        <Start userName={userName} onQuizStart={quizStartHandler} />
      )}
      {step === 2 && (
        <Question
          setUploadedOptions={setUploadedOptions}
          data={quizData.data[activeQuestion]}
          onAnswerUpdate={setAnswers}
          numberOfQuestions={quizData.data.length}
          activeQuestion={activeQuestion}
          onSetActiveQuestion={setActiveQuestion}
          onSetStep={setStep}
          uniqueUrl={uniqueUrl}
          userName={userName}
          passUniqueUrl={passUniqueUrl}
        />
      )}
      {step === 3 && (
        <End
          setScore={setScore}
          setLink={setLink}
          setStep={setStep}
          link={link}
          results={answers}
          data={quizData.data}
          onReset={resetClickHandler}
          onAnswersCheck={onAnswersCheck}
          time={time}
          uniqueUrl={uniqueUrl}
        />
      )}

      {showModal && (
        <Modall
          showModal={showModal}
          score={score}
          onClose={() => setShowModal(false)}
          results={answers}
          data={quizData.data}
        />
      )}
    </div>
  );
}

export default Questions;
