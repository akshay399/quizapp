import React, { useState, useEffect } from "react";
import "./NameInput.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Start from "../questions/Start";
import { useNavigate } from "react-router-dom";
import database from "../../fire";
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
});
function NameInput({
  setUserName,
  setQuestionName,
  uniqueUrl,
  quizData,
  setLink,
  passUniqueUrl,
  setUniqueUrl,
  setStep,
}) {
  const classes = useStyles();

  const navigate = useNavigate();
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [name, setName] = useState("");
  const onClick = () => {
    setStep(1);
    var temp = getUniqueUrl();

    console.log("functional temop", temp);
    passUniqueUrl(temp);
    console.log("clicked", temp);
    database.ref(temp).set(quizData);
    var currentUrl = window.location.href;
    var tempLink = `${currentUrl}quiz/${temp}`;
    setLink(tempLink);

    localStorage.setItem("link-name-input", tempLink);
    console.log("sharable link", tempLink);

    navigate("/questions");
    setUserName({ name });
    setQuestionName({ name });
    var obj = { name: name };
    database.ref(`${temp}/user`).update(obj);
  };

  const getUniqueUrl = () => {
    let unique_ur = (Math.random() + 1).toString(36).substring(3);
    console.log("random", unique_ur);
    unique_ur = unique_ur.substring(0, 7);
    setUniqueUrl(unique_ur);
    return unique_ur;
  };
  const handleChange = (e) => {
    setName(e.target.value);
  };
  useEffect(() => {
    if (!name) setIsNameEmpty(true);
  }, []);
  return (
    <>
      <div className="spacing"></div>
      <div className="name__input__container">
        <div className="name__input__box">
          <h2 className="heading">What's your name?</h2>
          <form>
            {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
            <TextField
              id="outlined-basic"
              variant="outlined"
              className="input__field"
              type="text"
              placeholder="john doe"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setIsNameEmpty(false);
                if (e.target.value === "") setIsNameEmpty(true);
                console.log("working?");
              }}
            />
          </form>
          <Button
            onClick={onClick}
            variant="contained"
            id="submit__button"
            className="submit__button"
            className={classes.copy__link}
            disabled={isNameEmpty}
          >
            Get Started
          </Button>
        </div>
      </div>
      <div className="spacing"></div>
    </>
  );
}

export default NameInput;
