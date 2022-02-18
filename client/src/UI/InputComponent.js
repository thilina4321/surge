import React, { Fragment } from "react";
import classes from "./input.module.css";

const InputComponent = (props) => {
  const { title, value, setValue } = props;
  return (
    <div className={classes.section}>
      <input placeholder={title} className={classes.input} value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
};

export default InputComponent;
