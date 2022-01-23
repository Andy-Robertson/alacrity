import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GlobalContext } from "./Contexts/GlobalContext";
// Assets
import "./Assets/styles/main.css";
import "./Assets/styles/normalize.css";
import "./Assets/styles/style.css";
// Layouts
import LeftSideBar from "./Layouts/LeftSideBar";
import Middle from "./Layouts/Middle";
import RightSideBar from "./Layouts/RightSideBar";
import Login from "./Layouts/Login";

// Production / Development environment selection.
const SERVER_URL = process.env.REACT_APP_WORKING_ENVIRONMENT === "production"
    ? "https://alacrity-focus.herokuapp.com"
    : "http://localhost:5000";

function App() {
  const [user, setUser] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch(`${SERVER_URL}/auth/login/success`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error("authentication has failed");
          }
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    getUser();
  }, []);

  // Update state with user settings when authenticated on load.
  useEffect(() => {
    fetch("/api/settings", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Unable to fetch user settings");
        }
      })
      .then((result) => {
        setMinutes(parseInt(result.pom_minutes));
        setSeconds(parseInt(result.pom_seconds));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // Update db with user settings.
  useEffect(() => {
    if (minutes !== null && seconds !== null) {
      fetch("/api/settings", {
        method: "PUT",
        body: JSON.stringify({
          pom_minutes: minutes,
          pom_seconds: seconds,
        }),
        headers: { "Content-Type": "application/json" },
      });
    }
  }, [minutes, seconds]);

  return (
    <main>
      <GlobalContext.Provider
        value={{
          minutes,
          setMinutes,
          seconds,
          setSeconds,
        }}
      >
        <LeftSideBar user={user} />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <Navigate to="/action" />
                ) : (
                  <Login SERVER_URL={SERVER_URL} />
                )
              }
            />
            <Route
              path="/action"
              element={user ? <Middle user={user} /> : <Navigate to="/" />}
            />
            <Route path="/login" element={<Login SERVER_URL={SERVER_URL} />} />
          </Routes>
        </BrowserRouter>
        <RightSideBar user={user} SERVER_URL={SERVER_URL} />
      </GlobalContext.Provider>
    </main>
  );
}

export default App;
