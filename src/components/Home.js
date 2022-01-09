import React from "react";
import Intro from "./intro/Intro";
import NameInput from "./name_input/NameInput";
import Steps from "./steps/Steps";
function Home({
  setUserName,
  uniqueUrl,
  quizData,
  setLink,
  passUniqueUrl,
  setUniqueUrl,
  setQuestionName,
}) {
  return (
    <div>
      <Intro></Intro>
      <Steps></Steps>
      <NameInput
        passUniqueUrl={passUniqueUrl}
        setUserName={setUserName}
        setQuestionName={setQuestionName}
        uniqueUrl={uniqueUrl}
        quizData={quizData}
        setLink={setLink}
        setUniqueUrl={setUniqueUrl}
      ></NameInput>
    </div>
  );
}

export default Home;
