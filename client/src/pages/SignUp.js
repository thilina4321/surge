import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../hooks/useHttp";
import ButtonComponent from "../UI/Button";
import InputComponent from "../UI/InputComponent";
import classes from "./page.module.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const [error, setError] = useState("");

  const navigator = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigator("/", { replace: false });
    }
  }, []);

  const loginRequest = useHttp({
    url: "/signup",
    method: "post",
    body: { email, password, userName, fullName, confirmPw },
  });

  const signupHandler = async () => {
    setError("");

    if (
      !email ||
      !password ||
      !fullName ||
      !userName ||
      !password ||
      !confirmPw
    ) {
      setError("Provide the details for all the above fields");
      return;
    }

    const reg = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    if (!reg.test(email)) {
      setError("Please provide valid email address");
      return;
    }
    if (password !== confirmPw) {
      setError("Password mis match");
      return;
    }
    setError("");
    const { data } = await loginRequest();
    if (data && data.success) {
      window.location = "/login";
      return;
    }
  };

  return (
    <div className={classes.main}>
      <ButtonComponent
        name="ALREADY HAVE AN ACCOUNT"
        onClickHandler={() => navigator("/login")}
      />

      <h2 style={{ color: "#fff", fontWeight: "bold" }}> SIGN UP </h2>
      <InputComponent
        title={"Full Name"}
        value={fullName}
        setValue={setFullName}
      />
      <InputComponent title={"Email"} value={email} setValue={setEmail} />
      <InputComponent
        title={"User Name"}
        value={userName}
        setValue={setUserName}
      />
      <InputComponent
        title={"Password"}
        value={password}
        setValue={setPassword}
      />
      <InputComponent
        title={"Confirm Password"}
        value={confirmPw}
        setValue={setConfirmPw}
      />

      {error && <p className={classes.error}>* {error}</p>}

      <ButtonComponent name="SIGN UP" onClickHandler={signupHandler} />
    </div>
  );
};

export default SignUp;
