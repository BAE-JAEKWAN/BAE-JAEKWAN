import "./App.css";
import { useState } from "react";

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

  console.log("업데이트!!");

  return (
    <div>
      <span>현재 시간 {state}시</span>
      <button type="button" onClick={handleClick}>
        Update
      </button>
    </div>
  );
}

export default App;
