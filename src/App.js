import React from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import SearchBar from "./components/SearchBar/SearchBar";
import VideosBox from "./components/VideosBox/VideosBox";
import Trending from "./components/Trending/Trending";
import AccountForm from "./components/AccountForm/AccountForm";
import { useLocalStorage } from "./useLocalStorage";
import { useEntertainment } from "./contexts/EntertainmentContext";

export default function App() {
  const { entertainmentData, page, searchQuery } = useEntertainment();
  const [loggedIn, setLoggedIn] = useLocalStorage(false, "entertainmentLogged");

  if (!entertainmentData) return <div>Loading application data</div>;

  console.log(entertainmentData);

  return (
    <div id="container">
      {page === "account" ? (
        <AccountForm loggedIn={loggedIn} />
      ) : (
        <>
          <NavBar />
          <main>
            <SearchBar />
            {page === "Home" && searchQuery.length === 0 && <Trending />}
            <VideosBox />
          </main>
        </>
      )}
    </div>
  );
}
