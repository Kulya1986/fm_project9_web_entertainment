import React, { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import SearchBar from "./components/SearchBar/SearchBar";
import VideosBox from "./components/VideosBox/VideosBox";
import Trending from "./components/Trending/Trending";
import AccountForm from "./components/AccountForm/AccountForm";

export default function App() {
  const [entertainmentData, setEntertainmentData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [searchResultData, setSearchResultData] = useState([]);
  const [page, setPage] = useState("Home");
  const [searchQuery, setSearchQuery] = useState("");
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  function handleSearchQueryChange(e) {
    setSearchQuery(e.target.value);
    handleSearchQuery(e.target.value);
    // if (e.target.value.length>0) setPage("Search");
    // else se
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
    setTrendingVideos(tempDataArr.slice(0, 5));
  }

  function handleSearchQuery(query) {
    const searchStr = query.toLowerCase();
    setSearchResultData(
      pageData.filter((item) => item.title.toLowerCase().includes(searchStr))
    );
  }

  useEffect(
    function handlePageDataChange() {
      switch (page) {
        case "Movies":
          setPageData(
            entertainmentData.filter(
              (item) => item.category.toLowerCase() === "movie"
            )
          );
          if (searchQuery)
            setSearchResultData(
              entertainmentData.filter(
                (item) =>
                  item.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) &&
                  item.category.toLowerCase() === "movie"
              )
            );
          break;
        case "TV Series":
          setPageData(
            entertainmentData.filter(
              (item) => item.category.toLowerCase() === "tv series"
            )
          );
          if (searchQuery)
            setSearchResultData(
              entertainmentData.filter(
                (item) =>
                  item.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) &&
                  item.category.toLowerCase() === "tv series"
              )
            );
          break;
        case "Bookmarked":
          setPageData(entertainmentData.filter((item) => item.isBookmarked));
          if (searchQuery)
            setSearchResultData(
              entertainmentData.filter(
                (item) =>
                  item.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) && item.isBookmarked
              )
            );
          break;
        default:
          setPageData(entertainmentData);
          if (searchQuery)
            setSearchResultData(
              entertainmentData.filter((item) =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
            );
      }
    },
    [entertainmentData, page]
  );

  useEffect(() => {
    fetch("/videos.json")
      .then((res) => res.json())
      .then((data) => {
        setEntertainmentData(data);
        setPageData(data);
        setTrendingVideos(data.slice(0, 5));
      })
      .catch((err) => console.error("Data fetching error: ", err));
  }, []);

  if (!entertainmentData) return <div>Loading application data</div>;

  console.log(entertainmentData);

  return (
    <div id="container">
      {page === "account" ? (
        <AccountForm />
      ) : (
        <>
          <NavBar menuPage={page} onMenuItemClick={handlePageChange}></NavBar>
          <main>
            <SearchBar
              searchQuery={searchQuery}
              handleSearchQueryChange={handleSearchQueryChange}
              handleSearchQuery={handleSearchQuery}
              page={page}
            />
            {page === "Home" && searchQuery.length === 0 && (
              <Trending
                videosData={trendingVideos}
                bookmarkClick={handleBookmarkClick}
              />
            )}
            {page !== "Bookmarked" && (
              <VideosBox
                sectionTitle={searchQuery.length === 0 ? page : "search"}
                videosData={
                  searchQuery.length === 0 ? pageData : searchResultData
                }
                bookmarkClick={handleBookmarkClick}
                searchQuery={searchQuery}
              />
            )}

            {page === "Bookmarked" && searchQuery.length === 0 && (
              <>
                <VideosBox
                  sectionTitle={"Bookmarked Movies"}
                  videosData={pageData.filter(
                    (item) => item.category === "Movie"
                  )}
                  bookmarkClick={handleBookmarkClick}
                  searchQuery={searchQuery}
                />
                <VideosBox
                  sectionTitle={"Bookmarked TV Series"}
                  videosData={pageData.filter(
                    (item) => item.category === "TV Series"
                  )}
                  bookmarkClick={handleBookmarkClick}
                  searchQuery={searchQuery}
                />
              </>
            )}
            {page === "Bookmarked" && searchQuery.length !== 0 && (
              <VideosBox
                sectionTitle={"search"}
                videosData={searchResultData}
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
