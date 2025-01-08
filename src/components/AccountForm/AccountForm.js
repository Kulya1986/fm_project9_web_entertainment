import React, { useState } from "react";
import AccountLogo from "./../../assets/logo.svg";
import "./AccountForm.css";

export default function AccountForm({
  loggedIn,
  //   emailAddress,
  //   password,
  //   passwordRepeat,
  //   handleEmailAddressChange,
  //   handlePasswordChange,
  //   handlePasswordRepeatChange,
  //   handleFormSubmit,
}) {
  const [newUser, setNewUser] = useState(true);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errMsg, setErrMsg] = useState({
    emailErrMsg: "Can't be empty",
    passwordErrMsg: "",
    repeatPassErrMsg: "",
  });

  function handleEmailAddressChange(e) {
    setEmailAddress(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleRepeatPasswordChange(e) {
    setRepeatPassword(e.target.value);
  }

  function handleNewUserChange() {
    setNewUser((curr) => !curr);
    if (repeatPassword) setRepeatPassword("");
  }

  function clearEmailError() {
    setErrMsg({
      ...errMsg,
      emailErrMsg: "",
    });
  }

  function clearPasswordError() {
    setErrMsg({
      ...errMsg,
      passwordErrMsg: "",
    });
  }

  function clearRepeatPassError() {
    setErrMsg({
      ...errMsg,
      passwordErrMsg: "",
    });
  }

  function handleFieldsValidation() {
    const emailExp = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    const passwordExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.*\W).{6,}$/;

    //validate email field
    if (emailAddress.length === 0)
      setErrMsg({ ...errMsg, emailErrMsg: "Can't be empty" });
    else if (emailAddress.search(emailExp) !== 0)
      setErrMsg({
        ...errMsg,
        emailErrMsg: "Use 'name@gmail.com'",
      });
    else
      setErrMsg({
        ...errMsg,
        emailErrMsg: "",
      });

    //validate password field

    if (password.length === 0)
      setErrMsg({ ...errMsg, passwordErrMsg: "Can't be empty" });
    else if (password.length < 7)
      setErrMsg({
        ...errMsg,
        passwordErrMsg: "6 symbols min",
      });
    else if (password.search(passwordExp) !== 0)
      setErrMsg({
        ...errMsg,
        passwordErrMsg: "Use [0-9],[A-Za-z]",
      });
    else
      setErrMsg({
        ...errMsg,
        passwordErrMsg: "",
      });

    //validate repeate password field

    if (repeatPassword.length === 0)
      setErrMsg({ ...errMsg, repeatPassErrMsg: "Can't be empty" });
    else if (password !== repeatPassword)
      setErrMsg({
        ...errMsg,
        repeatPassErrMsg: "Passwords must match",
      });
    else
      setErrMsg({
        ...errMsg,
        passwordErrMsg: "",
      });
  }

  function handleFormSubmit() {
    handleFieldsValidation();
    console.log({
      email: emailAddress,
      password: password,
    });
    alert({
      email: emailAddress,
      password: password,
    });
  }

  if (loggedIn)
    return (
      <div id="account-page-container">
        <div id="account-logo">
          <img src={AccountLogo} alt="logo" />
        </div>
        <div id="account-form-container">
          <h2>You are already logged in</h2>
        </div>
      </div>
    );

  return (
    <div id="account-page-container">
      <div id="account-logo">
        <img src={AccountLogo} alt="logo" />
      </div>
      <div id="account-form-container">
        <h2>{newUser ? "Sign Up" : "Login"}</h2>
        <div id="account-form">
          {/* <form
          id="account-form"
          onSubmit={handleFormSubmit}
        > */}
          <div>
            <input
              aria-label="email-field"
              type="text"
              id="email-field"
              name="email-field"
              placeholder={"Email address"}
              value={emailAddress}
              onChange={(e) => handleEmailAddressChange(e)}
              onInput={clearEmailError}
            />
            {errMsg.emailErrMsg.length > 0 && (
              <p className="error-msg">{errMsg.emailErrMsg}</p>
            )}
          </div>
          <div>
            <input
              aria-label="password-field"
              type="text"
              id="password-field"
              name="password-field"
              placeholder={"Password"}
              value={password}
              onChange={(e) => handlePasswordChange(e)}
              onInput={clearPasswordError}
            />
            {errMsg.passwordErrMsg.length > 0 && (
              <p className="error-msg">{errMsg.passwordErrMsg}</p>
            )}
          </div>

          {newUser && (
            <div>
              <input
                aria-label="repeat-password-field"
                type="text"
                id="repeat-password-field"
                name="repeat-password-field"
                placeholder={"Repeat password"}
                value={repeatPassword}
                onChange={(e) => handleRepeatPasswordChange(e)}
                onInput={clearRepeatPassError}
              />
              {errMsg.repeatPassErrMsg.length > 0 && (
                <p className="error-msg">{errMsg.repeatPassErrMsg}</p>
              )}
            </div>
          )}
          <button
            // type="submit"
            // value={newUser ? "Create an account" : "Login to your account"}
            onClick={handleFormSubmit}
            // onSubmit={handleFormSubmit}
          >
            {newUser ? "Create an account" : "Login to your account"}
          </button>
          {/* </form> */}
        </div>
        <p className="form-alternative">
          {newUser ? "Already have an account?" : "Don't have an account"}
          <button onClick={handleNewUserChange}>
            {newUser ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
