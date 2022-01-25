import React, { useEffect, useState } from "react";
import context from "react-bootstrap/esm/AccordionContext";
import database from "../../fire";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { shadows } from "@mui/system";

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
  close: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 2px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 40,
    // width: 20,
    padding: "0 30px",
  },
});

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
  const classes = useStyles();
  const [correctAnswers, setCorrectAnswers] = useState(0);
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

  const copyToClipboard = () => {
    var textToCopy = document.querySelector(".copy__link");
    console.log(textToCopy.value);
    textToCopy.select();
    textToCopy.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(textToCopy.value);
  };
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
            <h3>Your Quiz is ready!</h3>
            <p>
              Share your Quiz link with all your friends and see their results.
            </p>

            <p>
              <input
                className="copy__link"
                style={{
                  width: "80%",
                  textAlign: "center",
                  caretColor: "transparent",
                }}
                type="text"
                id="myText"
                value={link}
              />
            </p>
            <Button
              style={{ marginTop: "20", color: "white" }}
              className={classes.copy__link}
              onClick={copyToClipboard}
            >
              Copy Link
            </Button>
            <hr></hr>

            <Button
              style={{ color: "white" }}
              className={classes.close}
              onClick={onAnswersCheck}
            >
              Check your friends score
            </Button>
          </div>
        </div>
      </div>
      <br></br>
    </>
  );
};

export default End;
