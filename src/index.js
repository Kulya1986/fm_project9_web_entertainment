import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { EntertainmentProvider } from "./contexts/EntertainmentContext";
import { UserProvider } from "./contexts/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <EntertainmentProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </EntertainmentProvider>
  </React.StrictMode>
);
