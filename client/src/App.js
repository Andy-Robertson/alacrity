import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
// Assets
import "./Assets/styles/main.css";
import "./Assets/styles/normalize.css";
import "./Assets/styles/style.css";
// Layouts
import LeftSideBar from "./Layouts/LeftSideBar";
import Middle from "./Layouts/Middle";
import RightSideBar from "./Layouts/RightSideBar";
import Login from "./Layouts/Login";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          console.log(response);
          if (response.status === 200) return response.json();
          throw new Error("authentication has failed");
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

  return (
    <main>
      <LeftSideBar user={user} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/action" /> : <Login />}
          />
          <Route
            path="/action"
            element={user ? <Middle user={user} /> : <Navigate to="/" />}
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <RightSideBar user={user} />
    </main>
  );
}

export default App;
