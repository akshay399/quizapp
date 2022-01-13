import React, { useState, useEffect } from "react";
import "./Questions.css";

const Start = ({ onQuizStart, userName }) => {
  const [name, setName] = useState("");

  return (
    <div className="card">
      <div className="card-content">
        <div className="content">
          <h1>{userName.name}'s Quiz</h1>
          {console.log("in start trying name", name)}
          <p>Edit and select the correct answer for each of your questions:</p>
          <button className="button is-info is-medium" onClick={onQuizStart}>
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
