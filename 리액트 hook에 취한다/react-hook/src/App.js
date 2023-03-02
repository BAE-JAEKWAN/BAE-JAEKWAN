import "./App.css";
import { useState, useEffect, useRef } from "react";
import Timer from "./component/Timer";

const heavyWork = () => {
  console.log("엄청 무거운 작업");
  return ["배재관", "박해인"];
};

function App() {
  const [state, setState] = useState(1);
  const [renderer, setRenderer] = useState(0);
  const countRef = useRef(0);
  let countVar = 0;

  const handleClick = () => {
    let newState;
    if (state >= 24) {
      newState = 1;
    } else {
      newState = state + 1;
    }
    setState(newState);
  };

  const increaseCountRef = () => {
    countRef.current = countRef.current + 1;
    console.log("countRef", countRef);
  };

  const increaseCountVar = () => {
    countVar = countVar + 1;
    console.log("countVar", countVar);
  };

  const updateRenderer = () => {
    setRenderer(renderer + 1);
  };

  const printResult = () => {
    console.log(`countRef : ${countRef.current}, countVar : ${countVar}`);
  };

  // useState는 랜더링을 실행 하지만, useRef는 랜더링을 실행하지 않는다.
  // 화면 랜더링 횟수를 체크하고 싶을 땐 useRef를 사용하면 된다.
  const renderCount = useRef(0);
  useEffect(() => {
    renderCount.current = renderCount.current + 1;
    console.log("랜더링 실행 횟수 : ", renderCount.current);
  });

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
    alert(`${inputRef.current.value}님이 추가 되었습니다.`);
    inputRef.current.focus();
  };

  useEffect(() => {
    console.log("useEffect : 랜더링 될 때 마다 실행");
  }, [name]);

  const [showTimer, setShowTimer] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    console.log(inputRef);
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <section>
        <h1>useState, useEffect, useRef</h1>
        <p>현재 시간 {state}시</p>
        <p>Ref : {countRef.current}</p>
        <button type="button" onClick={handleClick}>
          Update
        </button>
        <button type="button" onClick={increaseCountRef}>
          countRef 증가
        </button>

        <div>
          {name.map((el, index) => {
            return (
              <p key={index}>
                {index}. {el}
              </p>
            );
          })}
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            ref={inputRef}
          />
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

      <section>
        <h1>useRef</h1>
        <p>Ref : {countRef.current}</p>
        <p>Var : {countVar}</p>
        <button type="button" onClick={increaseCountRef}>
          countRef 증가
        </button>
        <button type="button" onClick={increaseCountVar}>
          countVar 증가
        </button>
        <button type="button" onClick={updateRenderer}>
          렌더링
        </button>
        <button type="button" onClick={printResult}>
          결과 출력
        </button>
      </section>
    </div>
  );
}

export default App;
