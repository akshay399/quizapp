import React, { useEffect, useState } from "react";
import context from "react-bootstrap/esm/AccordionContext";
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
  setScore,
}) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  // const [score, setScore] = useState([]);
  const [updated, setUpdated] = useState(1);
  useEffect(() => {
    var data = localStorage.getItem("link-name-input");
    if (data) setLink(data);
    let correct = 0;
    results.forEach((result, index) => {
      if (result.a === data[index].answer) {
        correct++;
      }
    });
  }, []);

  var out = [];

  // const pullScoreFromFirebase = () => {
  //   var str = localStorage.getItem("link-name-input");
  //   // console.log("hereee", str);
  //   str = str.split("").reverse().join("");
  //   let result = str.substring(0, 7);
  //   result = result.split("").reverse().join("");
  //   // console.log(result);
  //   var context = [];
  //   var ref = database.ref(`${result}/friends`);
  //   ref.on("value", (snapshot) => {
  //     snapshot.forEach((childSnapshot) => {
  //       var friendName = childSnapshot.key;
  //       var friendScore = childSnapshot.val();
  //       var score_obj = { [friendName]: friendScore };
  //       context.push(score_obj);
  //     });
  //     out = context;
  //     // console.log("out ", context);
  //     // console.log("outtt", out);
  //   });

  //   return context;
  // };

  // const getScore = () => {
  //   var t = pullScoreFromFirebase();
  //   setUpdated(!updated);
  //   setScore(t);
  //   console.log("hm", score);
  // };

  useEffect(() => {
    var str = localStorage.getItem("link-name-input");
    str = str.split("").reverse().join("");
    let result = str.substring(0, 7);
    result = result.split("").reverse().join("");
    console.log("yaaaa", result);
    var context = [];
    var ref = database.ref(`${result}/friends`);
    ref.on("value", (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var friendName = childSnapshot.key;
        var friendScore = childSnapshot.val();
        var score_obj = { [friendName]: friendScore };
        console.log(score_obj);
        context.push(score_obj);
      });
      out = context;
      setScore(out);
    });
    console.log("before setting sco", context);
  }, []);
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
            <button className="button is-success">Try again</button>
          </div>
        </div>
      </div>
      <br></br>
      {/* <h2 className="score__board">{score.nishituu}</h2> */}
      {/* {console.log("ffffffffffff", out.nishituu)} */}
      <p>hahaah {out.nishituu}</p>
      {/* <h3 className="score__board">{correctAnswers}</h3> */}
    </>
  );
};

export default End;
