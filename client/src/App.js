import React from "react";
// Assets
import "./Assets/styles/main.css";
import "./Assets/styles/normalize.css";
import "./Assets/styles/style.css";
// Layouts
import LeftSideBar from "./Layouts/LeftSideBar";
import Middle from "./Layouts/Middle";
import RightSideBar from "./Layouts/RightSideBar";
import Login from "./Layouts/Login"

function App() {
  return (
    <main>
      <LeftSideBar />
      <Middle />
      <RightSideBar />
      <Login />
    </main>
  );
}

export default App;
