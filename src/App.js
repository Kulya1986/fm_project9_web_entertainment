import React, { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [entertainmentData, setEntertainmentData] = useState([]);
  const [page, setPage] = useState("home");

  useEffect(() => {
    fetch("/videos.json")
      .then((res) => res.json())
      .then((data) => setEntertainmentData(data))
      .catch((err) => console.error("Data fetching error: ", err));
  }, []);

  if (!entertainmentData) return <div>Loading application data</div>;

  console.log(entertainmentData);

  return <div className="container">Data loaded</div>;
}
