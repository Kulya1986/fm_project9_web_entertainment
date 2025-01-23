import React from "react";
import "./App.css";
import { useLocalStorage } from "./useLocalStorage";
import { useEntertainment } from "./contexts/EntertainmentContext";
import { BrowserRouter, Route, Routes } from "react-router";
import Movies from "./pages/Movies";
import TVseries from "./pages/TVseries";
import Bookmarked from "./pages/Bookmarked";
import Account from "./pages/Account";
import Homepage from "./pages/Homepage";

export default function App() {
  const { entertainmentData } = useEntertainment();
  const [loggedIn, setLoggedIn] = useLocalStorage(false, "entertainmentLogged");

  if (!entertainmentData) return <div>Loading application data</div>;

  console.log(entertainmentData);

  return (
    <div id="container">
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="movies" element={<Movies />} />
          <Route path="tv-series" element={<TVseries />} />
          <Route path="bookmarked" element={<Bookmarked />} />
          <Route path="account" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
