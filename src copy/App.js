import React, { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import SearchBar from "./components/SearchBar/SearchBar";
import VideosBox from "./components/VideosBox/VideosBox";
import Trending from "./components/Trending/Trending";
import AccountForm from "./components/AccountForm/AccountForm";
import { useLocalStorage } from "./useLocalStorage";

export default function App() {
  const [entertainmentData, setEntertainmentData] = useState([]);
  const [searchResultData, setSearchResultData] = useState([]);
  const [page, setPage] = useState("Home");
  const [searchQuery, setSearchQuery] = useState("");
  const [loggedIn, setLoggedIn] = useLocalStorage(false, "entertainmentLogged");

  function handleSearchQueryChange(e) {
    setSearchQuery(e.target.value);
  }

  function handlePageChange(name) {
    setPage(name);
    setSearchQuery("");
    setSearchResultData([]);
  }

  function handleBookmarkClick(name) {
    const tempDataArr = entertainmentData.map((item) => {
      if (item.title.toLowerCase() === name.toLowerCase()) {
        let bookmark = item.isBookmarked;
        return { ...item, isBookmarked: !bookmark };
      } else return item;
    });
    setEntertainmentData(tempDataArr);
  }

  useEffect(
    function handleEntertaimentDataChange() {
      setSearchResultData(
        entertainmentData.filter((item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    },
    [entertainmentData, searchQuery]
  );

  useEffect(() => {
    fetch("/videos.json")
      .then((res) => res.json())
      .then((data) => {
        setEntertainmentData(data);
      })
      .catch((err) => console.error("Data fetching error: ", err));
  }, []);

  if (!entertainmentData) return <div>Loading application data</div>;

  console.log(entertainmentData);

  return (
    <div id="container">
      {page === "account" ? (
        <AccountForm loggedIn={loggedIn} />
      ) : (
        <>
          <NavBar menuPage={page} onMenuItemClick={handlePageChange}></NavBar>
          <main>
            <SearchBar
              searchQuery={searchQuery}
              handleSearchQueryChange={handleSearchQueryChange}
              page={page}
            />
            {page === "Home" && searchQuery.length === 0 && (
              <Trending
                videosData={entertainmentData.filter((item) => item.isTrending)}
                bookmarkClick={handleBookmarkClick}
              />
            )}
            {page !== "Bookmarked" && (
              <VideosBox
                sectionTitle={searchQuery.length === 0 ? page : "search"}
                videosData={
                  searchQuery.length === 0
                    ? page !== "Home"
                      ? entertainmentData.filter(
                          (item) =>
                            item.category.toLowerCase() === page.toLowerCase()
                        )
                      : entertainmentData
                    : page !== "Home"
                    ? searchResultData.filter(
                        (item) =>
                          item.category.toLowerCase() === page.toLowerCase()
                      )
                    : searchResultData
                }
                bookmarkClick={handleBookmarkClick}
                searchQuery={searchQuery}
              />
            )}

            {page === "Bookmarked" && searchQuery.length === 0 && (
              <>
                <VideosBox
                  sectionTitle={"Bookmarked Movies"}
                  videosData={entertainmentData.filter(
                    (item) => item.isBookmarked && item.category === "Movies"
                  )}
                  bookmarkClick={handleBookmarkClick}
                  searchQuery={searchQuery}
                />
                <VideosBox
                  sectionTitle={"Bookmarked TV Series"}
                  videosData={entertainmentData.filter(
                    (item) => item.isBookmarked && item.category === "TV Series"
                  )}
                  bookmarkClick={handleBookmarkClick}
                  searchQuery={searchQuery}
                />
              </>
            )}
            {page === "Bookmarked" && searchQuery.length !== 0 && (
              <VideosBox
                sectionTitle={"search"}
                videosData={searchResultData.filter(
                  (item) => item.isBookmarked
                )}
                bookmarkClick={handleBookmarkClick}
                searchQuery={searchQuery}
              />
            )}
          </main>
        </>
      )}
    </div>
  );
}
