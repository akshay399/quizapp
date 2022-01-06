import React, { useState } from "react";

var newarr = [];
const Modal = ({ onClose, results, data }) => {
  const [answers, setAnswer] = useState([]);
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Your answers</p>
          <button className="delete" onClick={onClose}></button>
        </header>
        <section className="modal-card-body content">
          <ul>
            {console.log("results array: ", results)}
            {results.map((result, i) => (
              // {newarr[i].push(results)}
              // console.log("results array: ", result);

              <li key={i} className="mb-6">
                <p>
                  <strong>{result.q}</strong>
                </p>
                <p
                  className={
                    result.a === data[i].answer
                      ? "has-background-success has-text-white p-2"
                      : "has-background-danger has-text-white p-2"
                  }
                >
                  {newarr.push(result.a)}
                  Your answer: {result.a}
                </p>
                {result.a !== data[i].answer && (
                  <p className="has-background-link has-text-white p-2">
                    Correct answer: {data[i].answer}
                  </p>
                )}
                {/* <h2>{newarr}</h2> */}
              </li>
            ))}
          </ul>
        </section>
      </div>
      {console.log("answwerrr", newarr)};
    </div>
  );
  {
    setAnswer([...newarr, { id: newarr.length }]);
  }
};
// setAnswer(newarr);

export default Modal;
