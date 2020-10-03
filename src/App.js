import React, { useState, useEffect } from 'react';
import './App.css';
import { shuffle } from 'lodash';
import Game from './components/Game.js'


const App = () => {

  const deckOfCards = [
    "A of Hearts", "2 of Hearts", "3 of Hearts", "4 of Hearts",
    "5 of Hearts", "6 of Hearts", "7 of Hearts", "8 of Hearts", "9 of Hearts",
    "10 of Hearts", "J of Hearts", "Q of Hearts", "K of Hearts",
    "A of Clubs", "2 of Clubs", "3 of Clubs", "4 of Clubs",
    "5 of Clubs", "6 of Clubs", "7 of Clubs", "8 of Clubs", "9 of Clubs",
    "10 of Clubs", "J of Clubs", "Q of Clubs", "K of Clubs",
    "A of Diamonds", "2 of Diamonds", "3 of Diamonds", "4 of Diamonds",
    "5 of Diamonds", "6 of Diamonds", "7 of Diamonds", "8 of Diamonds", "9 of Diamonds",
    "10 of Diamonds", "J of Diamonds", "Q of Diamonds", "K of Diamonds",
    "A of Spades", "2 of Spades", "3 of Spades", "4 of Spades",
    "5 of Spades", "6 of Spades", "7 of Spades", "8 of Spades", "9 of Spades",
    "10 of Spades", "J of Spades", "Q of Spades", "K of Spades"
  ]

  const twoDecks = [...deckOfCards, ...deckOfCards]
  const shuffledDoubleDeck = shuffle(twoDecks)
  const firstFourCards = shuffledDoubleDeck.splice(0, 4)

  const [chipCount, setChipCount] = useState(1000)
  const [betAmount, setBetAmount] = useState(0)
  const [lockedBet, setLockedBet] = useState(0)
  const [previousBet, setPreviousBet] = useState(0)
  const [dealersCards, setDealersCards] = useState([])
  const [dealerCount, setDealerCount] = useState(null)
  const [playersCards, setPlayersCards] = useState([])
  const [playerCount, setPlayerCount] = useState(0)
  const [randomizedDecks, setRandomizedDecks] = useState([])
  const [isHandComplete, setIsHandComplete] = useState(true)
  const [isPlayerBusted, setIsPlayerBusted] = useState(false)
  const [isDealerBusted, setIsDealerBusted] = useState(false)
  const [isDealersTurn, setIsDealersTurn] = useState(false)
  const [winner, setWinner] = useState("")
  const [isBlackjack, setIsBlackJack] = useState(false)

  const shuffleDeck = () => {
    const newShuffle = shuffle(twoDecks)
    const newFirstFour = newShuffle.splice(0, 4)
    setRandomizedDecks(newShuffle)
    setPlayersCards([newFirstFour[0], newFirstFour[2]])
    setDealersCards([newFirstFour[1], newFirstFour[3]])
  }

  const startHand = () => {
    if(isHandComplete && lockedBet > 0) {
      shuffleDeck()
      setIsHandComplete(false)
      setWinner("")
      setIsPlayerBusted(false)
      setIsDealerBusted(false)
      setIsDealersTurn(false)
      setPlayerCount(0)
      setDealerCount(null)
      setIsBlackJack(false)
      setPreviousBet(lockedBet)
      setChipCount(chipCount - lockedBet)
      setLockedBet(0)
    }
  }

  useEffect(() => {
    if(previousBet > 0) {
      setLockedBet(0)
    }
  }, [previousBet])

  const resetBets = () => {
    setChipCount(chipCount + betAmount)
    setBetAmount(0)
  }

  const restartFresh = () => {
    if(chipCount === 0) {
      setChipCount(1000)
      setBetAmount(0)
    }
  }

  const handScore = (who, hand) => {
    let copyOfHand = [...hand]
    let sortedHand = copyOfHand.sort()
    let tenRegex = /^[JQK]|^10/
    let numRegex = /^[2-9]/
    let aceRegex = /^A/
    let acesLast = []
    sortedHand.forEach(card => {
      if(aceRegex.test(card)){
          acesLast.push(card)
      } else {
          acesLast.unshift(card)
      }
  })

    let handCount = 0

    for(let i = 0; i < acesLast.length; i++) {
        if(tenRegex.test(acesLast[i])) {
            handCount += 10
        } else if (numRegex.test(acesLast[i])) {
            handCount += parseInt(acesLast[i].match(numRegex)[0])
        } else if (aceRegex.test(acesLast[i])) {
            if(handCount <= 10) {
                handCount += 11
            } else if(handCount + 11 > 21) {
                handCount += 1
            }
        }
    }

    if(who === "dealer") {
      setDealerCount(handCount)
    }
    if(who === "player") {
      setPlayerCount(handCount)
    }
    return handCount
  }

  const handleHit = () => {
    if(playerCount < 21 && !isDealersTurn && winner !== "dealer" && !isBlackjack) {
      let currentDeck = [...randomizedDecks]
      let nextCard = currentDeck.splice(0, 1)[0]
      setPlayersCards([...playersCards, nextCard])
      setRandomizedDecks(currentDeck)
    }
  }

  const handleStay = () => {
    if(!isPlayerBusted && !isDealersTurn) {
      setIsDealersTurn(true)
    }
  }

  const handleLockedBet = () => {
    setLockedBet(betAmount)
  }

  const keepSameBet = () => {
    if(isHandComplete) {
      shuffleDeck()
      setIsHandComplete(false)
      setWinner("")
      setIsPlayerBusted(false)
      setIsDealerBusted(false)
      setIsDealersTurn(false)
      setPlayerCount(0)
      setDealerCount(null)
      setLockedBet(0)
      setIsBlackJack(false)
      setChipCount(chipCount - previousBet)
    }
  }

  const handleDouble = () => {

  }

  const handleSplit = () => {

  }

  const dealerHitAgain = () => {
    let tenRegex = /^[JQK]|^10/
    let numRegex = /^[2-9]/
    let aceRegex = /^A/

    let nextCardValue; 
    let currentDeck = randomizedDecks
    let nextCard = currentDeck.splice(0, 1)[0]
    
    if(tenRegex.test(nextCard)) {
      nextCardValue = 10
    } else if (numRegex.test(nextCard)) {
      nextCardValue = parseInt(nextCard.match(numRegex)[0])
    } else if (aceRegex.test(nextCard)) {
      if(dealerCount <= 10) {
        nextCardValue = 11
      } else if(dealerCount + 11 > 21) {
        nextCardValue = 1
      }
    }

    setDealersCards([...dealersCards, nextCard])
    setRandomizedDecks(currentDeck)
    setDealerCount(dealerCount + parseInt(nextCardValue))
  }

  useEffect(() => {
    handScore("player", playersCards)
  }, [playersCards])

  useEffect(() => {
    handScore("dealer", dealersCards)
  }, [dealersCards])

// Check for blackjack in the beginning
useEffect(() => {
  if(playersCards.length === 2 && 
    playerCount === 21 && 
    dealerCount !== 21) {
    setIsBlackJack(true)
    setWinner("player")
    setIsHandComplete("true")
    setIsDealersTurn("true")
  }

  if(dealersCards.length === 2 && 
    dealerCount === 21 && 
    playerCount !== 21) {
    setIsBlackJack(true)
    setWinner("dealer")
    setIsHandComplete("true")
    setIsDealersTurn("true")
  }

  if(playersCards.length === 2 && 
    dealersCards.length === 2 && 
    dealerCount === 21 && 
    playerCount === 21) {
    setWinner("push")
    setIsHandComplete("true")
    setIsDealersTurn("true")
  } 
})

// Player's turn
useEffect(() => {
  if(playerCount > 21) {
    setWinner("dealer")
    setIsPlayerBusted(true)
    setIsHandComplete(true)
    setIsDealersTurn(true)
  }
}, [playerCount])

//Dealer's turn
useEffect(() => {
  if(isDealersTurn && dealerCount < 17) {
    dealerHitAgain()
  }
  if(isDealersTurn && dealerCount >= 17 && dealerCount <= 21 && !isPlayerBusted) {
    if(dealerCount > playerCount) {
      setWinner("dealer")
      setIsHandComplete(true)
    }
    if(dealerCount < playerCount) {
      setWinner("player")
      setIsHandComplete(true)
    }
    if(dealerCount === playerCount) {
      setWinner("push")
      setIsHandComplete(true)
    }
  }
}, [isDealersTurn])

useEffect(() => {
  if(dealerCount > 21) {
    setIsDealerBusted(true)
    setWinner("player")
    setIsHandComplete(true)
  }

  if(dealerCount >= 17 && dealerCount < 22 && isDealersTurn) {
    if(dealerCount > playerCount) {
      setWinner("dealer")
      setIsHandComplete(true)
    }
    if(dealerCount < playerCount && !isPlayerBusted) {
      setWinner("player")
      setIsHandComplete(true)
    }
    if(dealerCount === playerCount && !isPlayerBusted) {
      setWinner("push")
      setIsHandComplete(true)
    }
  }

  if(dealerCount < 17 && isDealersTurn && !isPlayerBusted) {
    dealerHitAgain()
  }
}, [dealerCount])

// Payout / take losses / push
useEffect(() => {
  if(winner === "dealer") {
    setBetAmount(0)
  }
  if(winner === "player" && !isBlackjack) {
    setChipCount(chipCount + (previousBet * 2))
    // setBetAmount(0)
  }
  if(winner === "player" && isBlackjack) {
    setChipCount(chipCount + (previousBet * 2.5))
    // setBetAmount(0)
  }
  if(winner === "push") {
    setChipCount(chipCount + previousBet)
    // setBetAmount(0)
  }
  if(winner === "push" || winner === "dealer" || winner === "player") {
    // setPreviousBet(lockedBet)
  }
}, [winner])

useEffect(() => {
  if(lockedBet > 0) {
    setBetAmount(0)
  }
}, [lockedBet])

useEffect(() => {
  if(isPlayerBusted) {
    
  }
}, [isPlayerBusted])


   
  return (
    <div className="app">
      <header className="app-header">
        <p>Double Deck Blackjack</p>
        <p>
          Chip Count: {chipCount} 
          {isHandComplete && chipCount === 0 ? <button onClick={restartFresh}>Restart</button> : null}
        </p>
        <p>
          Pending Bet Amount: {betAmount} 
          <button onClick={resetBets}>Reset</button>
        </p>
      </header>
      <button onClick={startHand}>
        Start Hand
      </button>
      <Game randomizedDecks={randomizedDecks}
        playersCards={playersCards}
        dealersCards={dealersCards}
        chipCount={chipCount}
        setChipCount={setChipCount}
        betAmount={betAmount}
        setBetAmount={setBetAmount}
        playerCount={playerCount}
        setPlayerCount={setPlayerCount}
        dealerCount={dealerCount}
        setDealerCount={setDealerCount}
        handleHit={handleHit}
        handleStay={handleStay}
        handleDouble={handleDouble}
        handleSplit={handleSplit}
        lockedBet={lockedBet}
        handleLockedBet={handleLockedBet}
        isHandComplete={isHandComplete}
        isDealersTurn={isDealersTurn}
      />
      {
        winner ? 
          <div>
            <button onClick={keepSameBet}>Same Bet</button>
            <h1>
            {winner === "player" ? 
              `Player profited ${isBlackjack ? previousBet * 1.5 : previousBet}` : 
              winner === "dealer" ? 
              `Player lost ${previousBet}` : 
              winner === "push" ? 
              `Pushed back ${previousBet}` : null
            }
            </h1>
          </div> : <></>
      }
    </div>
  );
}


export default App;