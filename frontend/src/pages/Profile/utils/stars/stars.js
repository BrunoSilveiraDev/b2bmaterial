import React from "react";

import "./stars.css";

const Stars = (props) => {
  const handleClickStar = (value) => {
    console.log("New Star Value", value);
  };
  return (
    <div className="rating">
      <span onClick={() => handleClickStar(5)}>☆</span>
      <span onClick={() => handleClickStar(4)}>☆</span>
      <span onClick={() => handleClickStar(3)}>☆</span>
      <span onClick={() => handleClickStar(2)}>☆</span>
      <span onClick={() => handleClickStar(1)}>☆</span>
    </div>
  );
};

export default Stars;
