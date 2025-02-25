import { createContext, useContext, useEffect, useReducer } from "react";
import { fetchEntertaimentData } from "../apiEntertainment";

const EntertainmentContext = createContext();

const initialState = {
  entertainmentData: [],
  searchResultData: [],
  searchQuery: "",
  error: "",
  isLoading: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "page_change":
      return {
        ...state,

        searchQuery: "",
        searchResultData: [],
      };
    case "entertaiment_data_load":
      return {
        ...state,
        error: "",
        entertainmentData: action.payload,
        isLoading: false,
      };
    case "rejected_data_load":
      return { ...state, error: action.payload, isLoading: false };

    case "loading_data":
      return { ...state, isLoading: true };
    case "search":
      return {
        ...state,
        searchQuery: action.payload.query,
        searchResultData: action.payload.searchRes,
      };
    default:
      throw new Error("Unknown action type");
  }
}

function EntertainmentProvider({ children }) {
  const [
    { entertainmentData, searchResultData, searchQuery, error, isLoading },
    dispatch,
  ] = useReducer(reducer, initialState);

  function handleSearchQueryChange(e) {
    const query = e.target.value;
    const searchRes = entertainmentData.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    const resNum = searchRes.length;
    dispatch({ type: "search", payload: { query, searchRes, resNum } });
  }

  function handlePageChange() {
    dispatch({ type: "page_change" });
  }

  useEffect(function () {
    dispatch({ type: "loading_data" });
    async function fetchData() {
      try {
        const videosData = await fetchEntertaimentData();
        if (videosData)
          dispatch({ type: "entertaiment_data_load", payload: videosData });
        else
          dispatch({
            type: "rejected_data_load",
            payload: videosData,
          });
      } catch (err) {
        dispatch({
          type: "rejected_data_load",
          payload: err.message,
        });
      }
    }
    fetchData();
  }, []);

  return (
    <EntertainmentContext.Provider
      value={{
        entertainmentData,
        searchQuery,
        searchResultData,
        isLoading,
        error,
        handleSearchQueryChange,
        handlePageChange,
      }}
    >
      {children}
    </EntertainmentContext.Provider>
  );
}

function useEntertainment() {
  const context = useContext(EntertainmentContext);
  if (context === undefined) throw new Error("Irrelevant use of context");
  return context;
}

export { EntertainmentProvider, useEntertainment };
