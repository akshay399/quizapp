import React, { useState, useEffect } from "react";
import "./Questions.css";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import "./Start.css";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(180deg, #00A8FF 0%, #007CFF 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 50,
    width: "75%",
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
const Start = ({ onQuizStart, userName }) => {
  const classes = useStyles();

  const [name, setName] = useState("");

  return (
    <div className="card">
      <div className="card-content">
        <div className="content">
          <h1>{userName.name}'s Quiz</h1>
          {console.log("in start trying name", name)}
          <p>Edit and select the correct answer for each of your questions:</p>
          <Button
            style={{ color: "white" }}
            className={classes.root}
            onClick={onQuizStart}
          >
            Start
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Start;
