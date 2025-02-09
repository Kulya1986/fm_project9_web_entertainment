import React from "react";
import Magnifier from "./../../assets/icon-search.svg";
import "./SearchBar.css";

export default function SearchBar({
  searchQuery,
  handleSearchQueryChange,
  page,
}) {
  return (
    <div id="search-form">
      <label htmlFor="search-field">
        <img src={Magnifier} alt="search" />
      </label>
      <input
        type="text"
        id="search-field"
        name="search-field"
        placeholder={
          page === "Home"
            ? "Search for movies or TV series"
            : page === "Movies"
            ? "Search for movies"
            : page === "TV Series"
            ? "Search for TV series"
            : "Search for bookmarked shows"
        }
        value={searchQuery}
        onChange={(e) => handleSearchQueryChange(e)}
      />
    </div>
  );
}
