import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../hooks/useHttp";
import ButtonComponent from "../UI/Button";
import InputComponent from "../UI/InputComponent";
import classes from "./page.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const navigator = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigator("/", { replace: false });
    }
  }, []);

  const loginRequest = useHttp({
    url: "/login",
    method: "post",
    body: { email, password },
  });

  const loginHandler = async () => {
    setError("");

    if (!email || !password) {
      setError("Provide the details for all the above fields");
      return;
    }

    const reg = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    if (!reg.test(email)) {
      setError("Please provide valid email address");
      return;
    }
    setError("");

    const { data } = await loginRequest();
    if (data && data.success) {
      const user = data.data["user"];
      const token = data.data["token"];
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(token));
      window.location = "/";
      return;
    }
  };

  return (
    <div className={classes.main}>
      <ButtonComponent
        name="NEW MEMBER"
        onClickHandler={() => navigator("/signup")}
      />
      <h2 style={{ color: "#fff", fontWeight: "bold" }}> LOGIN </h2>
      <InputComponent title={"Email"} value={email} setValue={setEmail} />
      <InputComponent
        title={"Password"}
        value={password}
        setValue={setPassword}
      />
      {error && <p className={classes.error}>* {error}</p>}
      <ButtonComponent name="LOGIN" onClickHandler={loginHandler} />
    </div>
  );
};

export default Login;
