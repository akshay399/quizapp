import React, { useEffect, useState } from "react";
import database from "../../fire";

import { formatTime } from "../utils";

const End = ({
  setStep,
  results,
  data,
  onReset,
  onAnswersCheck,
  time,
  link,
  uniqueUrl,
  setLink,
}) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [score, setScore] = useState([]);
  const [storageLink, setStorageLink] = useState("");

  useEffect(() => {
    var data = localStorage.getItem("link-name-input");
    console.log("this is data from local storeage", data);
    if (data) setLink(data);
  }, []);
  // useEffect(() => {
  //   // setLink(storageLink);
  //   localStorage.setItem("li", link);
  // });
  useEffect(() => {
    setStorageLink(link);
    let correct = 0;
    results.forEach((result, index) => {
      if (result.a === data[index].answer) {
        correct++;
      }
    });
    //pull score
    var context = [];
    var ref = database.ref(`${uniqueUrl}/friends`);
    ref.on("value", function (snapshot) {
      snapshot.forEach((childSnapshot) => {
        var friendName = childSnapshot.key;
        var friendScore = childSnapshot.val();
        var score_obj = { [friendName]: friendScore };
        console.log("pulled firebase", friendName, friendScore);
        context.push(score_obj);
        // setScore();
      });
      setScore(context);
      console.log("out ", score);
    });
    //pull score ends
    setCorrectAnswers(correct);
  }, []);

  useEffect(() => {
    if (correctAnswers) localStorage.setItem("final-score", correctAnswers);
  });

  return (
    <>
      <div className="card">
        <div className="card-content">
          <div className="content">
            <h3>Your results</h3>
            <p>
              {correctAnswers} of {data.length}
            </p>
            <p>
              <strong>
                {Math.floor((correctAnswers / data.length) * 100)}%
              </strong>
            </p>
            <p>
              <strong>share this with your friend: </strong> {link}
            </p>
            <button className="button is-info mr-2" onClick={onAnswersCheck}>
              Check your answers
            </button>
            <button className="button is-success" onClick={onReset}>
              Try again
            </button>
          </div>
        </div>
      </div>
      <br></br>
      <h2 className="score__board">here are the reults</h2>
      {score.length != 0 && <p>score is present</p>}
    </>
  );
};

export default End;
