import React from "react";

const Content = ({ isDark }) => {
  return (
    <main
      className="main"
      style={{
        backgroundColor: isDark ? "black" : "white",
        color: isDark ? "white" : "black",
      }}
    >
      배재관님 좋은 하루 되세요! {isDark}
    </main>
  );
};

export default Content;
