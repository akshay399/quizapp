import React from "react";
import Intro from "./intro/Intro";
import NameInput from "./name_input/NameInput";
import Steps from "./steps/Steps";
function Home({ setUserName }) {
  return (
    <div>
      <Intro></Intro>
      <Steps></Steps>
      <NameInput setUserName={setUserName}></NameInput>
    </div>
  );
}

export default Home;
