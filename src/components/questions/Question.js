import React, { useState, useEffect, useRef } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import database from "../../fire";

const Question = ({
  data,
  onAnswerUpdate,
  numberOfQuestions,
  activeQuestion,
  onSetActiveQuestion,
  onSetStep,
}) => {
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const radiosWrapper = useRef();

  useEffect(() => {
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
  var choicesArray = [];
  const pushNewOption = (newOpt) => {
    console.log("upload to firebase");
    var pulledChoices = pullChoices();
    console.log("functional pulledChoices", pulledChoices);
    // choicesArray.push(newOpt);
    // console.log("pulled array: ", choicesArray);
    // choicesArray.append(newOpt);
    // database.ref("data/0/choices").set(choicesArray);
    console.log("executed");
  };
  const pullChoices = () => {
    var choicesRef = database.ref("data/0/choices");
    choicesRef.on("value", function (snapshot) {
      snapshot.forEach((childSnapshot) => {
        var childData = childSnapshot.val();
        choicesArray.push(childData);
        console.log("pulled firebase", childData);
      });
      console.log("pulled array before append: ", choicesArray);
      return choicesArray;
    });
  };
  const addOption = () => {
    console.log("add option clciked");
    const newOpt = prompt("Add the new option");
    console.log("neww", newOpt);
    if (newOpt) data.choices.push(newOpt);
    pushNewOption(newOpt);
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
  };

  return (
    <div className="card">
      <div className="card-content">
        <div className="content">
          <h2 className="mb-5">{data.question}</h2>

          <div className="control" ref={radiosWrapper}>
            {data.choices.map((choice, i) => (
              <>
                {/* {console.log(i)} */}
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
