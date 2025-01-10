import React, { useReducer, useState } from "react";
import AccountLogo from "./../../assets/logo.svg";
import "./AccountForm.css";

const initialState = {
  newUser: true,
  emailAddress: "",
  password: "",
  repeatPassword: "",
  errMsg: { emailErrMsg: "", passwordErrMsg: "", repeatPassErrMsg: "" },
};

function reducer(state, action) {
  switch (action.type) {
    case "newUserChange":
      return {
        ...state,
        newUser: !state.newUser,
        repeatPassword: "",
        errMsg: { ...state.errMsg, repeatPassErrMsg: "" },
      };
    case "emailAddressChange":
      return { ...state, emailAddress: action.payload };
    case "passwordChange":
      return { ...state, password: action.payload };
    case "repeatPasswordChange":
      return { ...state, repeatPassword: action.payload };
    case "clearEmailError":
      return {
        ...state,
        errMsg: { ...state.errMsg, emailErrMsg: "" },
      };
    case "clearPasswordError":
      return {
        ...state,
        errMsg: { ...state.errMsg, passwordErrMsg: "" },
      };
    case "clearRepeatPassError":
      return {
        ...state,
        errMsg: { ...state.errMsg, repeatPassErrMsg: "" },
      };
    case "setErrors":
      return {
        ...state,
        errMsg: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
}

export default function AccountForm({ loggedIn }) {
  const [formState, dispatch] = useReducer(reducer, initialState);
  const { newUser, emailAddress, password, repeatPassword, errMsg } = formState;

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

    dispatch({
      type: "setErrors",
      payload: {
        emailErrMsg: emailError,
        passwordErrMsg: passwordError,
        repeatPassErrMsg: repeatPasswordError,
      },
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
              onChange={(e) =>
                dispatch({
                  type: "emailAddressChange",
                  payload: e.target.value,
                })
              }
              onInput={() => dispatch({ type: "clearEmailError" })}
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
              onChange={(e) =>
                dispatch({
                  type: "passwordChange",
                  payload: e.target.value,
                })
              }
              onInput={() => dispatch({ type: "clearPasswordError" })}
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
                onChange={(e) =>
                  dispatch({
                    type: "repeatPasswordChange",
                    payload: e.target.value,
                  })
                }
                onInput={() => dispatch({ type: "clearRepeatPassError" })}
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
          <button onClick={() => dispatch({ type: "newUserChange" })}>
            {newUser ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
