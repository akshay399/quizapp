import React, { useState, useEffect } from "react";
import "./NameInput.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Start from "../questions/Start";
import { useNavigate } from "react-router-dom";
import database from "../../fire";

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
  const navigate = useNavigate();
  var varr = "hi fro name child";
  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [name, setName] = useState("");
  const onClick = () => {
    setStep(1);
    var temp = getUniqueUrl();

    console.log("functional temop", temp);
    passUniqueUrl(temp);
    console.log("clicked", temp);
    // let unique_url = (Math.random() + 1).toString(36).substring(3);
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
          className="submit__button"
          disabled={isNameEmpty}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}

export default NameInput;
