import React, { useState, useEffect, useRef } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import database from "../../fire";
import quizData from "../data/quiz.json";

var choicesArray = [];
var firebaseIndx = -1;
const Question = ({
  userName,
  uniqueUrl,
  data,
  onAnswerUpdate,
  numberOfQuestions,
  activeQuestion,
  onSetActiveQuestion,
  onSetStep,
  passUniqueUrl,
}) => {
  // const [firebaseAnswer, setSelectedAnswer] = useState("");
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const [isNewOptionAdded, setIsNewOptionAdded] = useState(false);
  const [pulledFirebaseQuestion, setPulledFirebaseQuestion] = useState("");
  const radiosWrapper = useRef();

  const getIndex = (question) => {
    var index = -1;

    var filteredRes = quizData.data.find(function (item, i) {
      if (item.question === question) {
        index = i;
        firebaseIndx = i;
        return i;
      }
    });
  };

  useEffect(() => {
    var questionRef = database.ref(uniqueUrl);
    questionRef.once("value", function (snapshot) {
      snapshot.forEach(function (element) {
        var q = element.val()[firebaseIndx].question;
        console.log("question pull: ", element.val()[firebaseIndx].question);
        setPulledFirebaseQuestion(q);
      });
    });
    console.log("reff", questionRef);

    setIsNewOptionAdded(false);
    const findCheckedInput =
      radiosWrapper.current.querySelector("input:checked");
    if (findCheckedInput) {
      findCheckedInput.checked = false;
    }
  }, [data]);

  //imporper logic should be improved
  const deleteOption = (choice) => {
    console.log("choice", choice);
    const index = choice;
    console.log("delteted ele", data.choices[choice]);
    console.log(data.choices);
    data.choices.splice(choice, 1);
  };

  const pushNewOption = (choicesArray, newOpt) => {
    console.log("upload to firebase", choicesArray);
    choicesArray.push(newOpt);
    console.log("new option added array: ", choicesArray);
    console.log("executed");
  };
  const pullChoices = (newOpt) => {
    var choicesRef = database.ref(`${uniqueUrl}/data/${firebaseIndx}/choices`);
    choicesRef.on("value", function (snapshot) {
      snapshot.forEach((childSnapshot) => {
        var childData = childSnapshot.val();
        choicesArray.push(childData);
        console.log("pulled firebase", childData);
      });
      choicesArray.push(newOpt);
      console.log("pulled array before append: ", choicesArray);
    });
  };
  const addOption = () => {
    const newOpt = prompt("Add the new option");
    console.log("neww", newOpt);
    if (newOpt) data.choices.push(newOpt);
    setIsNewOptionAdded(true);
    pullChoices(newOpt);
  };

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

    if (isNewOptionAdded) {
      database
        .ref(`${uniqueUrl}/data/${firebaseIndx}/choices`)
        .set(choicesArray);

      choicesArray = [];
      console.log("next button function executed");
    }
    database.ref(`${uniqueUrl}/data/${firebaseIndx}/answer`).set(selected);
  };
  console.log("usernamemememe", userName.name);
  var variable_name = `${userName.name}`;
  var firebaseQu = eval("`" + pulledFirebaseQuestion + "`");
  console.log("evaled", firebaseQu);

  return (
    <div className="card">
      <div className="card-content">
        <div className="content">
          {/* <h2 className="mb-5">{data.question}</h2> */}
          <h2 className="mb-5">{`firebase ${firebaseQu}`}</h2>
          {getIndex(data.question)}

          <div className="control" ref={radiosWrapper}>
            {data.choices.map((choice, i) => (
              <>
                {/* {console.log("is this the index?", i)} */}
                <DeleteIcon
                  key={choice}
                  onClick={() => deleteOption(i)}
                  sx={{ color: "red" }}
                  style={{
                    position: "absolute",
                    left: "100%",
                    cursor: "pointer",
                  }}
                />
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
          <Button
            onClick={addOption}
            variant="contained"
            style={{ marginBottom: "5px", marginTop: "15px" }}
          >
            add an option
          </Button>
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

export default Question;
