import React, { useState, useEffect } from "react";
import "./NameInput.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Start from "../questions/Start";
import { useNavigate  , useParams} from "react-router-dom";
import database  from "../../fire";
// import cryptoRandomString from "crypto-random-string";

function NameInputFriend() {

  const {code} = useParams();


  const [isNameEmpty, setIsNameEmpty] = useState(false);
  const [name, setName] = useState("");

  const onClick = () => {
    console.log("clicked",name , code);
    var obj = {[name]:0}
    database.ref(`${code}/friends`).update(obj);

  }
  
  return (
    <div className="name__input__container">
      <div className="name__input__box">
        <h2 className="heading">What's your name?</h2>
        <form>
          
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
          {`Get Started`}
        </Button>
      </div>
    </div>
  );
}

export default NameInputFriend;
