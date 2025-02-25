import React, { useReducer } from "react";
import AccountLogo from "./../../assets/logo.svg";
import "./AccountForm.css";
import { useUser } from "../../contexts/UserContext";
import { Link } from "react-router";
import { loginUser, registerUser } from "../../apiEntertainment";

const initialState = {
  newUser: true,
  emailAddress: "",
  password: "",
  repeatPassword: "",
  errMsg: {
    emailErrMsg: "",
    passwordErrMsg: "",
    repeatPassErrMsg: "",
    actionErrMsg: "",
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "newUserChange":
      return {
        ...state,
        newUser: !state.newUser,
        repeatPassword: "",
        errMsg: { ...state.errMsg, repeatPassErrMsg: "", actionErrMsg: "" },
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
    case "formActionError":
      return {
        ...state,
        errMsg: { ...state.errMsg, actionErrMsg: action.payload },
      };
    case "logoutClick":
      return initialState;
    default:
      throw new Error("Unknown action type");
  }
}

export default function AccountForm() {
  const [formState, dispatch] = useReducer(reducer, initialState);
  const { newUser, emailAddress, password, repeatPassword, errMsg } = formState;
  const { loggedIn, bookmarked, handleLogin, handleLogout } = useUser();

  function validateEmail(str) {
    const emailExp = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (str === 0) {
      //   console.log("Email empty");
      return "Can't be empty";
    } else if (!emailExp.test(str)) {
      //   console.log("email wrong format");
      return "Use 'name@gmail.com'";
    } else return "";
  }

  function validatePassword(str) {
    const passwordExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.*\W).{6,}$/;
    if (str.length === 0) {
      //   console.log("Password empty");
      return "Can't be empty";
    } else if (str.length < 6) {
      //   console.log("Pass length");
      return "6 symbols min";
    } else if (!passwordExp.test(str)) {
      //   console.log("Pass format");
      return "Use [0-9],[A-Za-z]";
    } else return "";
  }

  function validateRepeatPassword(str1, str2) {
    if (str2.length === 0) {
      //   console.log("Repeat empty");
      return "Can't be empty";
    } else if (str1 !== str2) {
      //   console.log("Don't match");
      return "Passwords must match";
    } else return "";
  }

  async function submitForm(e) {
    e.preventDefault();

    const formErrors = {
      emailErrMsg: validateEmail(emailAddress),
      passwordErrMsg: validatePassword(password),
      repeatPassErrMsg: newUser
        ? validateRepeatPassword(password, repeatPassword)
        : "",
      actionErrMsg: "",
    };

    if (
      formErrors.emailErrMsg.length > 0 ||
      formErrors.passwordErrMsg.length > 0 ||
      formErrors.repeatPassErrMsg.length > 0
    ) {
      dispatch({
        type: "setErrors",
        payload: formErrors,
      });
      return false;
    } else {
      if (newUser) {
        try {
          const res = await registerUser(emailAddress, password, bookmarked);
          if (res) {
            const loggedUserData = await loginUser(emailAddress, password);
            if (loggedUserData) handleLogin(loggedUserData);
            else {
              dispatch({
                type: "formActionError",
                payload: "Something went wrong while login. Try again!",
              });
              return false;
            }
          }
        } catch (err) {
          dispatch({
            type: "formActionError",
            payload: err.message,
          });
        }
      }

      if (!newUser) {
        try {
          const loggedUserData = await loginUser(emailAddress, password);

          if (loggedUserData) handleLogin(loggedUserData);
          else {
            dispatch({
              type: "formActionError",
              payload: "Something went wrong while login. Try again!",
            });
            return false;
          }
        } catch (err) {
          dispatch({
            type: "formActionError",
            payload: err.message,
          });
        }
      }
    }
  }

  function logoutClick() {
    dispatch({ type: "logoutClick" });
    handleLogout();
  }

  if (loggedIn)
    return (
      <div id="account-page-container">
        <div id="account-logo">
          <img src={AccountLogo} alt="logo" />
        </div>
        <div id="account-form-container">
          <h2 id="logged-msg">You're successfully logged in.</h2>
          <Link to="/">Go to the Homepage &rArr;</Link>
          <button onClick={logoutClick}>Logout</button>
        </div>
      </div>
    );

  return (
    <div id="account-page-container">
      <div id="account-logo">
        <img src={AccountLogo} alt="logo" />
      </div>
      <div id="account-back-link">
        <Link to="/">&lArr; Back to Homepage</Link>
      </div>
      <div id="account-form-container">
        <h2 className="account-form-header">{newUser ? "Sign Up" : "Login"}</h2>
        {errMsg.actionErrMsg && (
          <p className="account-form-error">{errMsg.actionErrMsg}</p>
        )}

        <form id="account-form" onSubmit={(e) => submitForm(e)}>
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
            type="submit"
            value={newUser ? "Create an account" : "Login to your account"}
          >
            {newUser ? "Create an account" : "Login to your account"}
          </button>
        </form>

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
