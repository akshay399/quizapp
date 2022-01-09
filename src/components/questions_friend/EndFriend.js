import React, { useEffect, useState } from "react";

import { formatTime } from "../utils";

const EndFriend = ({
  results,
  data,
  onReset,
  onAnswersCheck,
  time,
  dataFirebaseArray,
}) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    let correct = 0;
    console.log("srs", dataFirebaseArray);
    results.forEach((result, index) => {
      console.log("selceted: ", result.a);
      console.log("on firebase: ", dataFirebaseArray[index].answer);
      if (result.a === dataFirebaseArray[index].answer) {
        correct++;
      }
    });
    setCorrectAnswers(correct);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="card">
      <div className="card-content">
        <div className="content">
          <h3>Your results</h3>
          <p>
            {correctAnswers} of {data.length}
          </p>
          <p>
            <strong>{Math.floor((correctAnswers / data.length) * 100)}%</strong>
          </p>
          <p>
            {/* <strong>share this with your friend: </strong> {formatTime(time)} */}
            {/* <strong>share this with your friend: </strong> {link} */}
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
  );
};

export default EndFriend;
