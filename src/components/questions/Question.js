import React, { useState, useEffect, useRef } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import database from "../../fire";
import quizData from "../data/quiz.json";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(180deg, #00A8FF 0%, #007CFF 90%)",
    // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 40,
    padding: "0 30px",
  },
  copy__link: {
    background: "linear-gradient(180deg, #00A8FF 0%, #007CFF 90%)",
    // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 40,
    padding: "0 30px",
  },
  result: {
    background: "linear-gradient(180deg, #00b712 0%, #5aff15 90%);",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 40,
    // width: 20,
    padding: "0 30px",
  },
});

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
  const classes = useStyles();

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
          <h2 className="mb-5">{`${firebaseQu}`}</h2>
          {getIndex(data.question)}

          <div className="control" ref={radiosWrapper}>
            {data.choices.map((choice, i) => (
              <>
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
            style={{ marginBottom: "5px", marginTop: "15px" }}
          >
            add an option
          </Button>
          {error && <div className="has-text-danger">{error}</div>}
          <button
            style={{ width: "75%" }}
            className={classes.root}
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
