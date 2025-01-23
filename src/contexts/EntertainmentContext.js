import { createContext, useContext, useEffect, useReducer } from "react";

const EntertainmentContext = createContext();

const initialState = {
  entertainmentData: [],
  searchResultData: [],
  searchQuery: "",
  error: "",
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
      return { ...state, error: "", entertainmentData: action.payload };
    case "rejected_data_load":
      return { ...state, error: action.payload };
    case "bookmark_click":
      return {
        ...state,
        entertainmentData: action.payload,
        searchResultData: state.searchResultData.length
          ? action.payload.filter((item) =>
              item.title.toLowerCase().includes(state.searchQuery.toLowerCase())
            )
          : state.searchResultData,
      };
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
    {
      entertainmentData,
      searchResultData,

      searchQuery,
      error,
    },
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

  function handleBookmarkClick(name) {
    const tempArr = entertainmentData.reduce((acc, curr) => {
      if (curr.title.toLowerCase() === name.toLowerCase()) {
        let bookmark = curr.isBookmarked;
        return [...acc, { ...curr, isBookmarked: !bookmark }];
      } else return [...acc, curr];
    }, []);

    dispatch({ type: "bookmark_click", payload: tempArr });
  }

  useEffect(function () {
    async function fetchEntertaimentData() {
      try {
        const res = await fetch("/videos.json");
        const data = await res.json();
        dispatch({ type: "entertaiment_data_load", payload: data });
      } catch {
        dispatch({
          type: "rejected_data_load",
          payload: "There was an error while loading data",
        });
      }
    }
    fetchEntertaimentData();
  }, []);

  return (
    <EntertainmentContext.Provider
      value={{
        entertainmentData,
        searchQuery,
        searchResultData,

        error,
        handleSearchQueryChange,
        handleBookmarkClick,
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
