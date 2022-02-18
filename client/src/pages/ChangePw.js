import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../hooks/useHttp";
import ButtonComponent from "../UI/Button";
import InputComponent from "../UI/InputComponent";
import classes from "./page.module.css";

const ChangePw = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const localuser = JSON.parse(localStorage.getItem("user"));

  const navigator = useNavigate();

  const updateRequest = useHttp({
    url: "/update-password/" + localuser["_id"],
    method: "post",
    body: { currentPassword, newPassword },
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigator("/login", { replace: false });
    }
  }, []);

  const onupdatepasswordHandler = async () => {
    const { data } = await updateRequest();
    if (data && data.success) {
      navigator('/')
    }
  };

  return (
    <div className={classes.main}>
        <ButtonComponent
        name="Back To Profile"
        onClickHandler={()=>navigator('/')}
      />
      <div style={{height:'2rem'}}></div>
      <InputComponent
        value={currentPassword}
        setValue={setCurrentPassword}
        title="Current Password"
      />
      <InputComponent
        value={newPassword}
        setValue={setNewPassword}
        title="New Password"
      />
      <ButtonComponent
        name="Update Password"
        onClickHandler={onupdatepasswordHandler}
      />
    </div>
  );
};

export default ChangePw;
