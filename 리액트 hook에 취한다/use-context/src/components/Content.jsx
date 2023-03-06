import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";
import { userContext } from "../context/userContext";

const Content = () => {
  const { isDark } = useContext(ThemeContext);
  const user = useContext(userContext);
  return (
    <main
      className="main"
      style={{
        backgroundColor: isDark ? "black" : "white",
        color: isDark ? "white" : "black",
      }}
    >
      <p>
        {user}님 좋은 하루 되세요! {isDark}
      </p>
    </main>
  );
};

export default Content;
