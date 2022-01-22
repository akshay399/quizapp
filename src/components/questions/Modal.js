import React, { useState, useEffect } from "react";

var newarr = [];

const Modal = ({ onClose, results, data, score }) => {
  const [answers, setAnswer] = useState([]);

  useEffect(() => {
    console.log("in modal", score);
  }, []);

  console.log("js", score);
  // score.forEach((ele, idx) => {
  //   var key = Object.keys(ele)[0];
  //   // console.log("keyy", key, ele[key]);
  //   console.log(ele, Object.keys(ele)[0], ele[Object.keys(ele)[0]]);
  // });
  return (
    <>
      <div className="modal is-active">
        <div className="modal-background" onClick={onClose}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Your answers</p>
            <h1>
              {Object.keys(score[0])}
              {score[0].pppp}
            </h1>
            <button className="delete" onClick={onClose}></button>
          </header>
          <section className="modal-card-body content">
            <h3>
              <p style={{ color: "red" }}>yyyayaadaya</p>;
              {score.forEach((ele, idx) => {
                // console.log("keyy", key, ele[key]);
                <p style={{ color: "red" }}>yyyayaadaya</p>;
                console.log(ele, Object.keys(ele)[0], ele[Object.keys(ele)[0]]);
              })}
            </h3>
          </section>
        </div>
      </div>
    </>
  );
};
// setAnswer(newarr);

export default Modal;
