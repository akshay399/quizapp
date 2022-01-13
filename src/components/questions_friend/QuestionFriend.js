import React, { useState, useEffect, useRef } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import database from "../../fire";
import quizData from "../data/quiz.json";
import firebase from "../../fire";

const QuestionFriend = ({
  data,
  onAnswerUpdate,
  numberOfQuestions,
  activeQuestion,
  onSetActiveQuestion,
  onSetStep,
  uniqueUrl,
  dataFirebaseArray,
}) => {
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const [choicesArray, setChoicesArray] = useState([]);
  const [isNewOptionAdded, setIsNewOptionAdded] = useState(false);
  const [pulledFirebaseQuestion, setPulledFirebaseQuestion] = useState("");
  const radiosWrapper = useRef();
  var firebaseIndx;
  var pulledReal = [];
  // console.log("workkkk", dataFirebaseArray);
  const getIndex = (question) => {
    var index = -1;
    var filteredRes = quizData.data.find(function (item, i) {
      if (item.question === question) {
        index = i;
        firebaseIndx = i;
        return i;
      }
    });
    console.log("index", firebaseIndx);
  };
  var srsArray = [];

  useEffect(() => {
    // pullChoices();
    setIsNewOptionAdded(false);

    console.log("srs", dataFirebaseArray[firebaseIndx].choices);
    srsArray = dataFirebaseArray[firebaseIndx].choices;

    const findCheckedInput =
      radiosWrapper.current.querySelector("input:checked");
    if (findCheckedInput) {
      findCheckedInput.checked = false;
    }
  }, [data]);
  const changeHandler = (e) => {
    setSelected(e.target.value);
    console.log("on change selected", e.target.value);
    if (error) {
      setError("");
    }
  };

  const nextClickHandler = (e) => {
    if (selected === "") {
      return setError("Please select one option!");
    }
    onAnswerUpdate((prevState) => [
      ...prevState,
      { q: data.question, a: selected },
    ]);
    setSelected("");
    // setSelected(selected);
    if (activeQuestion < numberOfQuestions - 1) {
      onSetActiveQuestion(activeQuestion + 1);
    } else {
      onSetStep(3);
    }
  };

  var str = window.location.href;
  console.log("hereee", str);
  str = str.split("").reverse().join("");
  let result = str.substring(10, 17);
  result = result.split("").reverse().join("");
  console.log(result);
  var finalName = "";
  var nameFirebase = firebase.ref(`${result}/user`);
  nameFirebase.on("value", (snapshot) => {
    finalName = snapshot.val().name;
    console.log("print name here", snapshot.val().name);
  });
  console.log("pull working?", nameFirebase);
  var variable_name = `${finalName}`;
  var firebaseQu = eval("`" + data.question + "`");
  console.log("evaled", firebaseQu);
  return (
    <div className="card">
      <div className="card-content">
        <div className="content">
          <h2 className="mb-5">{firebaseQu}</h2>
          {getIndex(data.question)}
          {console.log("serious working?", srsArray)}

          <div className="control" ref={radiosWrapper}>
            {/* {console.log("data dot choices ", data.choices)} */}
            {console.log(
              "serious working2?",
              dataFirebaseArray[firebaseIndx].choices
            )}

            {dataFirebaseArray[firebaseIndx].choices.map((choice, i) => (
              <>
                {/* {console.log("is this the index?", i)} */}

                <label className="radio has-background-light" key={i}>
                  <input
                    type="radio"
                    name="answer"
                    value={choice}
                    onChange={changeHandler}
                  />
                  {choice}
                </label>
              </>
            ))}
          </div>

          {error && <div className="has-text-danger">{error}</div>}
          <button
            className="button is-link is-medium is-fullwidth mt-4"
            onClick={nextClickHandler}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionFriend;
