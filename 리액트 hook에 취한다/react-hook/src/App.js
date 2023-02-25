import "./App.css";
import { useState } from "react";

const heavyWork = () => {
  console.log("엄청 무거운 작업");
  return ["배재관", "박해인"];
};

function App() {
  const [state, setState] = useState(1);
  const handleClick = () => {
    let newState;
    if (state >= 24) {
      newState = 1;
    } else {
      newState = state + 1;
    }
    setState(newState);
  };

  const [name, setName] = useState(() => {
    return heavyWork();
  });
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    // console.log(e.target.value);
    setInput(e.target.value);
  };

  const setNameFunc = () => {
    setName((prevState) => {
      console.log(prevState);
      return [input, ...prevState];
    });
  };

  console.log("업데이트!!");

  return (
    <div>
      <span>현재 시간 {state}시</span>
      <button type="button" onClick={handleClick}>
        Update
      </button>

      <div>
        {name.map((el, index) => {
          return (
            <p key={index}>
              {index}. {el}
            </p>
          );
        })}
        <input type="text" value={input} onChange={handleInputChange} />
        <button type="button" onClick={setNameFunc}>
          Update
        </button>
      </div>
    </div>
  );
}

export default App;
