import React, { useState } from "react";
import "./App.css";
import EventIcon from "@material-ui/icons/Event";
import Events from './Components/Events/Events'

function App() {
  return (
    <div className="App">
      <header>
        <EventIcon
          style={{ fontSize: "60px", marginRight: "30px" }}
        ></EventIcon>
        <p>Boomer Memory</p>
      </header>
      <main>
        <Events></Events>
      </main>
    </div>
  );
}

export default App;
