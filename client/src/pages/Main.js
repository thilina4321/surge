import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../hooks/useHttp";
import ButtonComponent from "../UI/Button";
import InputComponent from "../UI/InputComponent";
import classes from "./page.module.css";

const Main = () => {
  const navigator = useNavigate();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const localuser = JSON.parse(localStorage.getItem("user"));

  const userRequest = useHttp({
    url: localuser ? "/current-user/" + localuser["_id"] : "",
    method: "get",
  });

  const updateRequest = useHttp({
    url: localuser ? "/update-user/" + localuser["_id"] : "",
    method: "post",
    body: { email, fullName, userName },
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigator("/login", { replace: false });
      return;
    }

    const getUsers = async () => {
      const { data } = await userRequest();
      if (data && data.success) {
        const { email, userName, fullName } = data["data"];
        setEmail(email);
        setUserName(userName);
        setFullName(fullName);
      }
    };
    getUsers();
  }, []);

  const [error, setError] = useState("");

  const logoutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigator("/login");
  };

  const updateUserDataHandler = async () => {
    const { data } = await updateRequest();
    if (data && data.success) {
      const { email, userName, fullName } = data["data"];
      setEmail(email);
      setUserName(userName);
      setFullName(fullName);
    }
  };

  return (
    <div className={classes.main}>
      <ButtonComponent name="Logout" onClickHandler={logoutHandler} />

      <h1>User Details</h1>
      <InputComponent value={email} setValue={setEmail} title="Email" />
      <InputComponent
        value={userName}
        setValue={setUserName}
        title="User Name"
      />
      <InputComponent
        value={fullName}
        setValue={setFullName}
        title="Full Name"
      />
      <ButtonComponent
        name={"Update User Data"}
        onClickHandler={updateUserDataHandler}
      />

      <div style={{ height: "4rem" }}></div>

      <ButtonComponent
        name={"Change Password"}
        onClickHandler={() => navigator("/change-password")}
      />
    </div>
  );
};

export default Main;
