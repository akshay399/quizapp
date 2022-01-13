import React, { useEffect, useState } from "react";
import firebase from "../../fire";

const EndFriend = ({
  results,
  data,
  onReset,
  onAnswersCheck,
  time,
  dataFirebaseArray,
  name,
  uniqueUrl,
}) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    console.log("NAAM VBABABBA", name);
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
    console.log("unique url from app.js in end friend", uniqueUrl);
    var str = window.location.href;
    str = str.split("").reverse().join("");
    let result = str.substring(10, 17);
    result = result.split("").reverse().join("");
    console.log(result);
    var finalName = "";
    var nameFirebase = firebase.ref(`${result}/friends`);
    nameFirebase.on("value", (snapshot) => {
      finalName = snapshot.val();
      console.log("print name here", Object.keys(finalName)[0]);
      var name_friend = name;
      console.log("cehcehcekchecke", name);
      if (name_friend) var obj = { [name_friend]: correct };
      console.log("object updated with scoresss", obj);
      firebase.ref(`${result}/friends`).update(obj);
    });
    console.log();
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
          <p></p>
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
