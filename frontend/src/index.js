// React imports
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

// Styling imports
import "./index.css";

// Other imports
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { CurrentUserProvider } from "./context/CurrentUserContext";
import { ProfileDataProvider } from "./context/ProfileDataContext";
import { AlertProvider } from "./context/AlertContext";

ReactDOM.render(
  <Router>
    <CurrentUserProvider>
      <ProfileDataProvider>
        <AlertProvider>
          <App />
        </AlertProvider>
      </ProfileDataProvider>
    </CurrentUserProvider>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
