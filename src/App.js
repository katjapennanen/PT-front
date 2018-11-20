import React, { Component } from 'react';
import './App.css';
import Customerlist from './components/customerlist';
import Traininglist from './components/traininglist';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Customers</h2> 
        </header>
        <Traininglist />
        <Customerlist />
      </div>
    );
  }
}

export default App;
