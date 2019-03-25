import React, { Component } from "react";
import CustomerList from "./components/CustomerList";
import TrainingList from "./components/TrainingList";
import Calendar from "./components/Calendar";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Personal training customer & appointment manager</h2>
        </header>
        <Calendar />
        <TrainingList />
        <CustomerList />
      </div>
    );
  }
}

export default App;
