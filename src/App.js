import React, { Component } from "react";
import Customerlist from "./components/customerlist";
import Traininglist from "./components/traininglist";
import Calendar from "./components/calendar";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Personal training customer & appointment manager</h2>
        </header>
        <Calendar />
        <Traininglist />
        <Customerlist />
      </div>
    );
  }
}

export default App;
