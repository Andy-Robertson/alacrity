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
const SERVER_URL = (
  process.env.REACT_APP_WORKING_ENVIRONMENT === "production"
    ? "https://alacrity-focus.herokuapp.com"
    : "http://localhost:5000"
);

function App() {
  const [user, setUser] = useState(null);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

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
          console.log(err);
        });
    };
    getUser();
  }, []);

  // Update db with custom user time settings.
  useEffect(() => {
    fetch(`${SERVER_URL}/settings`, {
      method: "PUT",
      body: JSON.stringify({
        pom_min_setting: minutes,
        pom_sec_setting: seconds,
      }),
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    });
  }, [minutes, seconds]);

  // Update state with user settings when authenticated on load.
  useEffect(() => {
    fetch(`${SERVER_URL}/settings`, {
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
          throw new Error("Unable to fetch user settings");
        }
      })
      .then((result) => {
        setMinutes(result.pom_min_setting);
        setSeconds(result.pom_sec_setting);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  return (
    <main>
      <GlobalContext.Provider
        value={{ minutes, setMinutes, seconds, setSeconds }}
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
