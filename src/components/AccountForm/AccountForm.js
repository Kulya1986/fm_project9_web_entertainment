import React, { useState } from "react";
import AccountLogo from "./../../assets/logo.svg";
import "./AccountForm.css";

export default function AccountForm({ loggedIn }) {
  const [newUser, setNewUser] = useState(true);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errMsg, setErrMsg] = useState({
    emailErrMsg: "",
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
    if (repeatPassword) {
      setRepeatPassword("");
      clearRepeatPassError();
    }
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
      repeatPassErrMsg: "",
    });
  }

  function handleFieldsValidation() {
    const emailExp = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    const passwordExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.*\W).{6,}$/;
    let emailError, passwordError, repeatPasswordError;

    //validate email field
    if (emailAddress.length === 0) {
      //   console.log("Email empty");
      emailError = "Can't be empty";
    } else if (emailAddress.search(emailExp) !== 0) {
      //   console.log("email wrong format");
      emailError = "Use 'name@gmail.com'";
    } else emailError = "";

    //validate password field

    if (password.length === 0) {
      //   console.log("Password empty");
      passwordError = "Can't be empty";
    } else if (password.length < 6) {
      //   console.log("Pass length");
      passwordError = "6 symbols min";
    } else if (password.search(passwordExp) !== 0) {
      //   console.log("Pass format");
      passwordError = "Use [0-9],[A-Za-z]";
    } else passwordError = "";

    //validate repeate password field

    if (repeatPassword.length === 0) {
      //   console.log("Repeat empty");
      repeatPasswordError = "Can't be empty";
    } else if (password !== repeatPassword) {
      //   console.log("Don't match");
      repeatPasswordError = "Passwords must match";
    } else repeatPasswordError = "";

    setErrMsg({
      emailErrMsg: emailError,
      passwordErrMsg: passwordError,
      repeatPassErrMsg: repeatPasswordError,
    });
  }

  function handleFormSubmit() {
    handleFieldsValidation();
    console.log({
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
          <h2 id="logged-msg">You are already logged in</h2>
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
              type="password"
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
                type="password"
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
