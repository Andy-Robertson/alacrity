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
import "animate.css";

// Production / Development environment selection.
const SERVER_URL = process.env.REACT_APP_WORKING_ENVIRONMENT === "production"
    ? "https://alacrity-focus.herokuapp.com"
    : "http://localhost:5000";

function App() {
  const [user, setUser] = useState(null);
  const [TasksData, setTasksData] = useState([]);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const [enableNotificationSound, setEnableNotificationSound] = useState(null);
  const [enableNotifications, setEnableNotifications] = useState(null);

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

  useEffect(() => {
    user && (
      fetch("/api/tasks")
        .then((res) => res.json())
        .then((data) => {
          setTasksData(data);
        })
    );
  }, [user]);

  useEffect(() => {
    user && (
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
          setEnableNotificationSound(result.notifications_sound_active);
          setEnableNotifications(result.notifications_active);
        })
        .catch((err) => {
          console.error(err);
        })
    );
  }, [user]);

  // Update db with user settings.
  useEffect(() => {
    if (minutes !== null && seconds !== null) {
      fetch("/api/settings", {
        method: "PUT",
        body: JSON.stringify({
          pom_minutes: minutes,
          pom_seconds: seconds,
          notifications_sound_active: enableNotificationSound,
          notifications_active: enableNotifications,
        }),
        headers: { "Content-Type": "application/json" },
      });
    }
  }, [minutes, seconds, enableNotificationSound, enableNotifications]);

  const submitComplete = () => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasksData(data);
      });
  };

  return (
    <main>
      <GlobalContext.Provider
        value={{
          minutes,
          setMinutes,
          seconds,
          setSeconds,
          setTasksData,
          enableNotificationSound,
          setEnableNotificationSound,
          enableNotifications,
          setEnableNotifications,
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
              element={
                user ? (
                  <Middle
                    user={user}
                    SERVER_URL={SERVER_URL}
                    taskData={TasksData}
                    submitComplete={submitComplete}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route path="/login" element={<Login SERVER_URL={SERVER_URL} />} />
            <Route
              path="/*"
              element={
                user ? (
                  <Middle
                    user={user}
                    SERVER_URL={SERVER_URL}
                    taskData={TasksData}
                    submitComplete={submitComplete}
                  />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
          </Routes>
        </BrowserRouter>
        <RightSideBar
          user={user}
          SERVER_URL={SERVER_URL}
          submitComplete={submitComplete}
        />
      </GlobalContext.Provider>
    </main>
  );
}

export default App;
