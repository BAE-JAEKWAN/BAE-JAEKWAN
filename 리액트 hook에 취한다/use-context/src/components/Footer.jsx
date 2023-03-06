import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

const Footer = () => {
  const { isDark, setIsDark } = useContext(ThemeContext);
  const themeToggle = () => {
    setIsDark(!isDark);
  };
  return (
    <footer
      className="footer"
      style={{
        backgroundColor: isDark ? "black" : "lightgray",
        color: isDark ? "white" : "black",
      }}
    >
      <button onClick={themeToggle}>{isDark ? "화이트" : "다크"}모드</button>
    </footer>
  );
};

export default Footer;
