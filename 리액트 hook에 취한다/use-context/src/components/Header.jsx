import React, { useContext } from "react";
import { ThemeContext } from "../context/themeContext";
import { userContext } from "../context/userContext";

const Header = () => {
  const { isDark } = useContext(ThemeContext);
  const user = useContext(userContext);
  console.log(user);
  return (
    <header
      className="header"
      style={{
        backgroundColor: isDark ? "black" : "lightgray",
        color: isDark ? "white" : "black",
      }}
    >
      <h1>Welcome {user}!</h1>
    </header>
  );
};

export default Header;
