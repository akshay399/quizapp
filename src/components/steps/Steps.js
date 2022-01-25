import React from "react";
import "./Steps.css";

function Steps() {
  return (
    <>
      <div className="spacing"></div>
      <div className="steps__container">
        <div className="box" style={{ color: "white" }}>
          <ol className="ordered__list">
            <li>Create your own quiz</li>
            <li>Share it with your friends</li>
            <li>See their results & discover your real best friends</li>
          </ol>
        </div>
      </div>
    </>
  );
}

export default Steps;
