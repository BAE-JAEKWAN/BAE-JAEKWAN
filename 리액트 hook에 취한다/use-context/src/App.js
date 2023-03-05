import "./App.css";
import { useState } from "react";
import Page from "./components/Page";

function App() {
  const [isDark, setIsDark] = useState(false);
  return <Page isDark={isDark} setIsDark={setIsDark}></Page>;
}

export default App;
