import React from "react";
import Magnifier from "./../../assets/icon-search.svg";
import "./SearchBar.css";
import { useEntertainment } from "../../contexts/EntertainmentContext";

export default function SearchBar({ inputPlaceholder }) {
  const { searchQuery, handleSearchQueryChange } = useEntertainment();
  return (
    <div id="search-form">
      <label htmlFor="search-field">
        <img src={Magnifier} alt="search" />
      </label>
      <input
        type="text"
        id="search-field"
        name="search-field"
        placeholder={inputPlaceholder}
        value={searchQuery}
        onChange={(e) => handleSearchQueryChange(e)}
      />
    </div>
  );
}
