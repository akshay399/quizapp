import React from "react";
import "./Intro.css";

function Intro() {
  return (
    <div className="intro__content">
      <div>
        {" "}
        <img
          className="intro__image center"
          alt="intro"
          src="https://wallpapercave.com/wp/wp9600138.jpg"
        />
      </div>
      <div>
        <h1 className="intro__heading center">Best Friend Quiz</h1>
        <p className="intro__subheading center">
          How well do your friends know you?
        </p>
      </div>
    </div>
  );
}

export default Intro;
