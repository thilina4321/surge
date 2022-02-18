import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Model from "./UI/Model";

const GlobalLoadingSpinner = () => {
  const [isLoading, setIsLoading] = useState(false);
  global.setIsLoading = setIsLoading;
  return isLoading ? (
    <div
      style={{ position: "fixed", top: "300px", left: "40%", color: "black" }}
    >
      {/* <LoadingSpinner /> */}
      loading
    </div>
  ) : null;
};

const GlobalErrorDialogBox = () => {
  const [errorState, setErrorState] = useState(false);
  const [errors, setErrors] = useState('');

  const showAlert = (argErrors) => {
    setErrorState(true);
    setErrors(argErrors);
  };

  global.showAlert = showAlert;

  return (
    <Fragment>{errorState && <Model error={errors} setErrorState={setErrorState} />}</Fragment>
  );
};

ReactDOM.render(
  <Fragment>
    <GlobalLoadingSpinner />
    <GlobalErrorDialogBox />
    <App />
  </Fragment>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
