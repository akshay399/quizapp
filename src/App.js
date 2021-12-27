import "./App.css";
import Intro from "./components/intro/Intro";
import NameInput from "./components/name_input/NameInput";
import Steps from "./components/steps/Steps";

function App() {
  return (
    <div className="App">
      <Intro></Intro>
      <Steps></Steps>
      <NameInput></NameInput>
    </div>
  );
}

export default App;
