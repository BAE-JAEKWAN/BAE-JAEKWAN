import React from "react";

const Footer = ({ isDark, setIsDark }) => {
  const themeToggle = () => {
    setIsDark(!isDark);
    console.log(setIsDark, isDark);
  };
  return (
    <footer
      className="footer"
      style={{
        backgroundColor: isDark ? "black" : "white",
        color: isDark ? "white" : "black",
      }}
    >
      <button onClick={themeToggle}>{isDark ? "화이트" : "다크"}모드</button>
    </footer>
  );
};

export default Footer;
