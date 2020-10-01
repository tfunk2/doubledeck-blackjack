import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    chipCount: 1000,
    dealersCards: [],
    playersCards: [],
    randomizedDecks: [],
    isHandComplete: false,
    isPlayerBusted: false,
    isDealerBusted: false
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">
          
        </header>
      </div>
    );
  }
}

export default App;
