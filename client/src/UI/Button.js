import React from "react";

const ButtonComponent = (props) => {
  const { name, onClickHandler } = props;
  return (
    <button onClick={onClickHandler} className="btn">
      {name}
    </button>
  );
};

export default ButtonComponent;
