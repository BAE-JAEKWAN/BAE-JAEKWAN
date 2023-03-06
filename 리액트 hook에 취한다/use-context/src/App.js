import "./App.css";
import { useState } from "react";
import Page from "./components/Page";
import { ThemeContext } from "./context/themeContext";
import { userContext } from "./context/userContext";

function App() {
  const [isDark, setIsDark] = useState(false);
  return (
    <userContext.Provider value={"사용자"}>
      <ThemeContext.Provider value={{ isDark, setIsDark }}>
        <Page />;
      </ThemeContext.Provider>
    </userContext.Provider>
  );
}

export default App;
