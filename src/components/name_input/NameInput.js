import React, { useState, useEffect } from "react";
import "./NameInput.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Start from "../questions/Start";
import { useNavigate } from "react-router-dom";

function NameInput({ setUserName }) {
  const navigate = useNavigate();

  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [name, setName] = useState("");
  const onClick = () => {
    navigate("/questions");
    setUserName({ name });
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
