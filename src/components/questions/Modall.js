import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { shadows } from "@mui/system";
const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  close: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 2px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 40,
    // width: 20,
    padding: "0 30px",
  },
});

const Modall = ({ onClose, results, data, score, showModal }) => {
  const classes = useStyles();
  const [answers, setAnswer] = useState([]);

  useEffect(() => {
    console.log("in modal", score);
  }, []);
  var temp = [1, 2, 3, 4, 5];
  console.log("js", score);

  return (
    <>
      <Modal
        show={showModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onClick={onClose}>
          <Modal.Title id="contained-modal-title-vcenter">
            Your Friends
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {score.length != 0 && (
            <ul>
              {score.map((ele, i) => (
                <li key={i} className="mb-6">
                  <p>
                    <p>
                      {Object.keys(ele)[0]} : {ele[Object.keys(ele)[0]]}
                    </p>
                  </p>
                </li>
              ))}
            </ul>
          )}
          {score.length == 0 && <h2>YOU HAVE NO FRIENDS... yet(!)</h2>}
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ color: "white" }}
            className={classes.close}
            onClick={onClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Modall;
