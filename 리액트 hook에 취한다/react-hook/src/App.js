import "./App.css";
import { useState, useEffect } from "react";
import Timer from "./component/Timer";

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

  useEffect(() => {
    console.log("useEffect : 랜더링 될 때 마다 실행");
  }, [name]);

  const [showTimer, setShowTimer] = useState(false);

  return (
    <div>
      <section>
        <h1>useState, useEffect</h1>
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
      </section>

      <section>
        <h1>useEffect</h1>
        {showTimer && <Timer />}
        <button
          type="button"
          onClick={() => {
            setShowTimer(!showTimer);
          }}
        >
          Toggle timer
        </button>
      </section>
    </div>
  );
}

export default App;
