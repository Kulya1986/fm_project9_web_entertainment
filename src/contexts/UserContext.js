import { createContext, useContext, useReducer } from "react";
import { checkLocalStorage } from "../checkLocalStorage";
import { bookmarkClick } from "../apiEntertainment";

const UserContext = createContext();

const initialState = {
  loggedIn: checkLocalStorage(false, "entertainmentLogged"),
  email: checkLocalStorage("", "entertainmentEmail"),
  bookmarked: checkLocalStorage([], "bookmarkedByUser"),
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,

        loggedIn: true,
        email: action.payload.email,
        bookmarked: action.payload.bookmarked,
      };
    case "logout":
      return {
        ...state,

        loggedIn: false,
        email: "",
        bookmarked: [],
      };
    case "add_to_bookmark":
      return { ...state, bookmarked: [...state.bookmarked, action.payload] };
    case "remove_from_bookmark":
      return {
        ...state,
        bookmarked: state.bookmarked.filter((item) => item !== action.payload),
      };
    case "logged_user_bookmarked_update":
      return { ...state, bookmarked: action.payload };
    case "error_generated":
      return {
        ...state,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
}

function UserProvider({ children }) {
  const [{ loggedIn, email, bookmarked, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function handleLogin(userData) {
    dispatch({ type: "login", payload: userData });
    localStorage.setItem("entertainmentLogged", JSON.stringify(true));
    localStorage.setItem("entertainmentEmail", JSON.stringify(userData.email));
    localStorage.setItem(
      "bookmarkedByUser",
      JSON.stringify(userData.bookmarked)
    );
  }

  function handleLogout() {
    dispatch({ type: "logout" });
    localStorage.setItem("entertainmentLogged", JSON.stringify(false));
    localStorage.setItem("entertainmentEmail", JSON.stringify(""));
    localStorage.setItem("bookmarkedByUser", JSON.stringify([]));
  }

  async function handleBookmarkClick(videoID) {
    if (loggedIn) {
      try {
        const data = await bookmarkClick(email, videoID);
        if (data) {
          dispatch({
            type: "logged_user_bookmarked_update",
            payload: data[0].bookmarked,
          });
          localStorage.setItem(
            "bookmarkedByUser",
            JSON.stringify(data[0].bookmarked)
          );
          console.log(data[0].bookmarked);
        }
      } catch (err) {
        dispatch({ type: "error_generated", payload: err.message });
      }
    } else {
      if (bookmarked.filter((video) => video === videoID).length > 0) {
        dispatch({ type: "remove_from_bookmark", payload: videoID });
        localStorage.setItem(
          "bookmarkedByUser",
          JSON.stringify(bookmarked.filter((video) => video !== videoID))
        );
      } else {
        dispatch({ type: "add_to_bookmark", payload: videoID });
        localStorage.setItem(
          "bookmarkedByUser",
          JSON.stringify([...bookmarked, videoID])
        );
      }
    }
  }

  return (
    <UserContext.Provider
      value={{
        loggedIn,
        email,
        bookmarked,
        error,
        handleLogin,
        handleBookmarkClick,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) throw new Error("Irrelevant use of context");
  return context;
}

export { UserProvider, useUser };
