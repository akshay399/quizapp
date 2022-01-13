import "./Questions.css";
import React, { useState, useEffect } from "react";
import "bulma/css/bulma.min.css";

import quizData from "../data/quiz.json";
import Question from "./Question";
import End from "./End";
import Modal from "./Modal";
import Start from "./Start";
import database from "../../fire";
let interval;

function Questions({
  userName,
  uniqueUrl,
  link,
  passUniqueUrl,
  setUploadedOptions,
}) {
  const [step, setStep] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState(0);

  // useEffect(() => {
  //   console.log("did username reach here not friend", userName.name);

  //   if (step === 3) {
  //     clearInterval(interval);
  //   }
  // }, [step]);

  const quizStartHandler = () => {
    setStep(2);
    interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
  };

  const resetClickHandler = () => {
    // setActiveQuestion(0);
    setAnswers([]);
    setStep(2);
    setTime(0);
    interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
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
          link={link}
          results={answers}
          data={quizData.data}
          onReset={resetClickHandler}
          onAnswersCheck={() => setShowModal(true)}
          time={time}
          uniqueUrl={uniqueUrl}
        />
      )}

      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          results={answers}
          data={quizData.data}
        />
      )}
    </div>
  );
}

export default Questions;
