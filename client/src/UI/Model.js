import React from "react";
import ButtonComponent from "./Button";
import classes from "./modal.module.css";

const Model = (props) => {
  const { setErrorState, error } = props;
  const removeError = () => {
    setErrorState(false);
  };
  console.log(error);
  return (
    <div className={classes.main} onClick={removeError}>
      <div className={classes.modal}>
        <div className={classes.element}>
          <p> {error} </p>
          <ButtonComponent name="Close" onClickHandler={removeError} />
        </div>
      </div>
    </div>
  );
};

export default Model;
