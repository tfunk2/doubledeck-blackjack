import React, { useState } from 'react';
import './App.css';


const App = () => {

  const [chipCount, setChipCount] = useState(1000)
  const [dealersCards, setDealerCards] = useState([])
  const [playersCards, setPlayersCards] = useState([])
  const [randomizedDecks, setRandomizedDecks] = useState([])
  const [isHandComplete, setIsHandComplete] = useState(false)
  const [isPlayerBusted, setIsPlayerBusted] = useState(false)
  const [isDealerBusted, setIsDealerBusted] = useState(false)

  return (
    <div className="app">
      <header className="app-header">
        Double Deck Blackjack
      </header>
    </div>
  );
}


export default App;