import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./components/Home";
import Questions from "./components/questions/Questions";
import React, { useState, useEffect } from "react";

function App() {
  const [userName, setUserName] = useState("");
  return (
    <Router>
      <Routes>
        {/* <Home></Home> */}
        <Route path="/" element={<Home setUserName={setUserName} />} />
        <Route path="/questions" element={<Questions userName={userName} />} />
      </Routes>
    </Router>
  );
}

export default App;
