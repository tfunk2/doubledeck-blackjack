import React, { useState, useEffect } from "react";
import "./App.css";
import { shuffle } from "lodash";
import Game from "./components/Game.js";
import Five from "./images/5-chip.png";
import TwentyFive from "./images/25-chip.png";
import OneHundred from "./images/100-chip.png";
import FiveHundred from "./images/500-chip.png";
import OneThousand from "./images/1000-chip.png";
import TenThousand from "./images/10k-chip.png";
import FiftyThousand from "./images/50k-chip.png";
import OneHundredK from "./images/100k-chip.png";
import FiveHundredK from "./images/500k-chip.png";
import OneMillion from "./images/1m-chip.png";

const App = () => {
  const deckOfCards = [
    "AH",
    "2H",
    "3H",
    "4H",
    "5H",
    "6H",
    "7H",
    "8H",
    "9H",
    "10H",
    "JH",
    "QH",
    "KH",
    "AC",
    "2C",
    "3C",
    "4C",
    "5C",
    "6C",
    "7C",
    "8C",
    "9C",
    "10C",
    "JC",
    "QC",
    "KC",
    "AD",
    "2D",
    "3D",
    "4D",
    "5D",
    "6D",
    "7D",
    "8D",
    "9D",
    "10D",
    "JD",
    "QD",
    "KD",
    "AS",
    "2S",
    "3S",
    "4S",
    "5S",
    "6S",
    "7S",
    "8S",
    "9S",
    "10S",
    "JS",
    "QS",
    "KS",
  ];

  const twoDecks = [...deckOfCards, ...deckOfCards];
  const shuffledDoubleDeck = shuffle(twoDecks);
  const firstFourCards = shuffledDoubleDeck.splice(0, 4);

  const [randomizedDecks, setRandomizedDecks] = useState([]);
  const [chipCount, setChipCount] = useState(1000);
  const [betAmount, setBetAmount] = useState(0);
  const [lockedBet, setLockedBet] = useState(0);
  const [previousBet, setPreviousBet] = useState(0);
  const [dealersCards, setDealersCards] = useState([]);
  const [dealerCount, setDealerCount] = useState(0);
  const [playersCards, setPlayersCards] = useState([]);
  const [playerCount, setPlayerCount] = useState(0);
  const [isBlackjack, setIsBlackJack] = useState(false);
  const [isPlayerBusted, setIsPlayerBusted] = useState(false);
  const [didDouble, setDidDouble] = useState(false);
  const [isDealersTurn, setIsDealersTurn] = useState(false);
  const [isDealerBusted, setIsDealerBusted] = useState(false);
  const [isHandComplete, setIsHandComplete] = useState(true);
  const [winner, setWinner] = useState("");

  const shuffleDeck = () => {
    const newShuffle = shuffle(twoDecks);
    const newFirstFour = newShuffle.splice(0, 4);
    setRandomizedDecks(newShuffle);
    setPlayersCards([newFirstFour[0], newFirstFour[2]]);
    setDealersCards([newFirstFour[1], newFirstFour[3]]);
  };

  const startHand = () => {
    if (isHandComplete && lockedBet > 0) {
      shuffleDeck();
      setIsHandComplete(false);
      setWinner("");
      setIsPlayerBusted(false);
      setIsDealerBusted(false);
      setIsDealersTurn(false);
      setPlayerCount(0);
      setDealerCount(null);
      setIsBlackJack(false);
      setPreviousBet(lockedBet);
      setChipCount(chipCount - lockedBet);
      setLockedBet(0);
      setDidDouble(false);
    }
  };

  useEffect(() => {
    if (previousBet > 0) {
      setLockedBet(0);
    }
  }, [previousBet]);

  const resetBets = () => {
    setBetAmount(0);
  };

  const restartFresh = () => {
    if (chipCount < 5) {
      setChipCount(1000);
      setBetAmount(0);
    }
  };

  const handScore = (who, hand) => {
    let copyOfHand = [...hand];
    let sortedHand = copyOfHand.sort();
    let tenRegex = /^[JQK]|^10/;
    let numRegex = /^[2-9]/;
    let aceRegex = /^A/;
    let acesLast = [];
    sortedHand.forEach((card) => {
      if (aceRegex.test(card)) {
        acesLast.push(card);
      } else {
        acesLast.unshift(card);
      }
    });

    let handCount = 0;

    for (let i = 0; i < acesLast.length; i++) {
      if (tenRegex.test(acesLast[i])) {
        handCount += 10;
      } else if (numRegex.test(acesLast[i])) {
        handCount += parseInt(acesLast[i].match(numRegex)[0]);
      } else if (aceRegex.test(acesLast[i])) {
        if (handCount <= 10) {
          handCount += 11;
        } else if (handCount + 11 > 21) {
          handCount += 1;
        }
      }
    }

    if (who === "dealer") {
      setDealerCount(handCount);
    }
    if (who === "player") {
      setPlayerCount(handCount);
    }
    return handCount;
  };

  const handleHit = () => {
    if (
      playerCount < 21 &&
      !isDealersTurn &&
      winner !== "dealer" &&
      !isBlackjack
    ) {
      setTimeout(() => {
        let currentDeck = [...randomizedDecks];
        let nextCard = currentDeck.splice(0, 1)[0];
        setPlayersCards([...playersCards, nextCard]);
        setRandomizedDecks(currentDeck);
      }, 300);
    }
  };

  const handleStay = () => {
    if (!isPlayerBusted && !isDealersTurn) {
      setIsDealersTurn(true);
    }
  };

  const handleBet = (bet) => {
    if (betAmount + bet <= chipCount && isHandComplete) {
      setBetAmount(betAmount + bet);
    }
  };

  const handleLockedBet = () => {
    if (betAmount > 0) {
      setLockedBet(betAmount);
    }
  };

  const keepSameBet = () => {
    if (isHandComplete && chipCount >= previousBet && previousBet > 0) {
      shuffleDeck();
      setIsHandComplete(false);
      setWinner("");
      setIsPlayerBusted(false);
      setIsDealerBusted(false);
      setIsDealersTurn(false);
      setPlayerCount(0);
      setDealerCount(null);
      setLockedBet(0);
      setIsBlackJack(false);
      setChipCount(chipCount - previousBet);
      setDidDouble(false);
    }
  };

  const handleDouble = () => {
    if (
      !isDealersTurn &&
      playersCards.length === 2 &&
      chipCount >= previousBet
    ) {
      handleHit();
      setTimeout(() => {
        setIsDealersTurn(true);
      }, 1500);
      setDidDouble(true);
      setChipCount(chipCount - previousBet);
    }
  };

  // const handleSplit = () => {

  // }

  const clearLockedBet = () => {
    setLockedBet(0);
  };

  const dealerHitAgain = () => {
    let tenRegex = /^[JQK]|^10/;
    let numRegex = /^[2-9]/;
    let aceRegex = /^A/;

    let nextCardValue;
    let currentDeck = randomizedDecks;
    let nextCard = currentDeck.splice(0, 1)[0];

    if (tenRegex.test(nextCard)) {
      nextCardValue = 10;
    } else if (numRegex.test(nextCard)) {
      nextCardValue = parseInt(nextCard.match(numRegex)[0]);
    } else if (aceRegex.test(nextCard)) {
      if (dealerCount <= 10) {
        nextCardValue = 11;
      } else if (dealerCount + 11 > 21) {
        nextCardValue = 1;
      }
    }
    setTimeout(() => {
      setDealersCards([...dealersCards, nextCard]);
      setRandomizedDecks(currentDeck);
      setDealerCount(dealerCount + parseInt(nextCardValue));
    }, 500);
  };

  useEffect(() => {
    handScore("player", playersCards);
  }, [playersCards]);

  useEffect(() => {
    handScore("dealer", dealersCards);
  }, [dealersCards]);

  // Check for blackjack in the beginning
  useEffect(() => {
    if (playersCards.length === 2 && playerCount === 21 && dealerCount !== 21) {
      setIsBlackJack(true);
      setWinner("player");
      setIsHandComplete("true");
      setIsDealersTurn("true");
    }

    if (dealersCards.length === 2 && dealerCount === 21 && playerCount !== 21) {
      setIsBlackJack(true);
      setWinner("dealer");
      setIsHandComplete("true");
      setIsDealersTurn("true");
    }

    if (
      playersCards.length === 2 &&
      dealersCards.length === 2 &&
      dealerCount === 21 &&
      playerCount === 21
    ) {
      setWinner("push");
      setIsHandComplete("true");
      setIsDealersTurn("true");
    }
  });

  // Player's turn
  useEffect(() => {
    if (playerCount > 21) {
      setWinner("dealer");
      setIsPlayerBusted(true);
      setIsHandComplete(true);
      setIsDealersTurn(true);
    }
  }, [playerCount]);

  //Dealer's turn
  useEffect(() => {
    if (
      isDealersTurn &&
      dealerCount < 17 &&
      !isPlayerBusted &&
      winner !== "player"
    ) {
      setTimeout(() => {
        dealerHitAgain();
      }, 500);
    }
    if (
      isDealersTurn &&
      dealerCount >= 17 &&
      dealerCount <= 21 &&
      !isPlayerBusted
    ) {
      if (dealerCount > playerCount) {
        setWinner("dealer");
        setIsHandComplete(true);
      }
      if (dealerCount < playerCount) {
        setWinner("player");
        setIsHandComplete(true);
      }
      if (dealerCount === playerCount) {
        setWinner("push");
        setIsHandComplete(true);
      }
    }
  }, [isDealersTurn]);

  useEffect(() => {
    if (dealerCount > 21) {
      setIsDealerBusted(true);
      setWinner("player");
      setIsHandComplete(true);
    }

    if (dealerCount >= 17 && dealerCount < 22 && isDealersTurn) {
      if (dealerCount > playerCount) {
        setWinner("dealer");
        setIsHandComplete(true);
      }
      if (dealerCount < playerCount && !isPlayerBusted) {
        setWinner("player");
        setIsHandComplete(true);
      }
      if (dealerCount === playerCount && !isPlayerBusted) {
        setWinner("push");
        setIsHandComplete(true);
      }
    }

    if (dealerCount < 17 && isDealersTurn && !isPlayerBusted) {
      setTimeout(() => {
        dealerHitAgain();
      }, 500);
    }
  }, [dealerCount]);

  // Payout / take losses / push
  useEffect(() => {
    if (winner === "dealer") {
      setBetAmount(0);
    }
    if (winner === "player" && !isBlackjack) {
      if (didDouble) {
        setChipCount(chipCount + previousBet * 4);
      } else {
        setChipCount(chipCount + previousBet * 2);
      }
    }
    if (winner === "player" && isBlackjack) {
      setChipCount(chipCount + previousBet * 2.5);
    }
    if (winner === "push") {
      if (didDouble) {
        setChipCount(chipCount + previousBet * 2);
      } else {
        setChipCount(chipCount + previousBet);
      }
    }
    if (winner === "push" || winner === "dealer" || winner === "player") {
      // setPreviousBet(lockedBet)
    }
  }, [winner]);

  useEffect(() => {
    if (lockedBet > 0) {
      setBetAmount(0);
    }
  }, [lockedBet]);

  useEffect(() => {
    if (isPlayerBusted) {
    }
  }, [isPlayerBusted]);

  return (
    <div className="app">
      <header className="app-header">
        <p className="title">Double Deck Blackjack</p>
        <div className="pending-bet-div">
          <button
            className="reset-button"
            id={betAmount > 0 ? "ready-to-start" : "not-ready"}
            onClick={resetBets}
          >
            Reset
          </button>
          <p className="pending-bet">
            Next Bet:{" "}
            <div
              className="chip-number"
              id={
                betAmount === 0 && previousBet === 0
                  ? "attention-green"
                  : "normal-text"
              }
            >
              {betAmount}
            </div>
          </p>
        </div>
        <p className="chip-count">
          Chip Count:{" "}
          <div
            className="chip-number"
            id={chipCount === 0 ? "attention-red" : "normal-text"}
          >
            {chipCount}
          </div>
          {isHandComplete && chipCount === 0 ? (
            <button
              className="betting-option restart-button"
              id={chipCount < 5 ? "ready-to-start" : "not-ready"}
              onClick={restartFresh}
            >
              Restart
            </button>
          ) : null}
        </p>
      </header>
      <Game
        randomizedDecks={randomizedDecks}
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
        // handleSplit={handleSplit}
        lockedBet={lockedBet}
        handleLockedBet={handleLockedBet}
        isHandComplete={isHandComplete}
        isDealersTurn={isDealersTurn}
        isPlayerBusted={isPlayerBusted}
        isDealerBusted={isDealerBusted}
        didDouble={didDouble}
        startHand={startHand}
        handleBet={handleBet}
        previousBet={previousBet}
        winner={winner}
        isBlackjack={isBlackjack}
        clearLockedBet={clearLockedBet}
      />
      <div className="game-result-div">
        <section className="betting-options">
          {isHandComplete ? (
            <div className="inner-betting-options">
              {chipCount >= 5 ? (
                <img
                  src={Five}
                  onClick={() => handleBet(5)}
                  className="bet-button"
                ></img>
              ) : null}
              {chipCount >= 25 ? (
                <img
                  src={TwentyFive}
                  onClick={() => handleBet(25)}
                  className="bet-button"
                ></img>
              ) : null}
              {chipCount >= 100 ? (
                <img
                  src={OneHundred}
                  onClick={() => handleBet(100)}
                  className="bet-button"
                ></img>
              ) : null}
              {chipCount >= 500 ? (
                <img
                  src={FiveHundred}
                  onClick={() => handleBet(500)}
                  className="bet-button"
                ></img>
              ) : null}
              {chipCount >= 1000 ? (
                <img
                  src={OneThousand}
                  onClick={() => handleBet(1000)}
                  className="bet-button"
                ></img>
              ) : null}
              {chipCount >= 10000 ? (
                <img
                  src={TenThousand}
                  onClick={() => handleBet(10000)}
                  className="bet-button"
                ></img>
              ) : null}
              {chipCount >= 50000 ? (
                <img
                  src={FiftyThousand}
                  onClick={() => handleBet(50000)}
                  className="bet-button"
                ></img>
              ) : null}
              {chipCount >= 100000 ? (
                <img
                  src={OneHundredK}
                  onClick={() => handleBet(100000)}
                  className="bet-button"
                ></img>
              ) : null}
              {chipCount >= 500000 ? (
                <img
                  src={FiveHundredK}
                  onClick={() => handleBet(500000)}
                  className="bet-button"
                ></img>
              ) : null}
              {chipCount >= 1000000 ? (
                <img
                  src={OneMillion}
                  onClick={() => handleBet(1000000)}
                  className="bet-button"
                ></img>
              ) : null}
            </div>
          ) : (
            <></>
          )}
        </section>
        <button
          className="betting-option"
          id={betAmount > 0 ? "ready-to-start" : "not-ready"}
          onClick={handleLockedBet}
        >
          Place Bet
        </button>
        {isHandComplete ? (
          <button
            className="betting-option"
            id={lockedBet > 0 ? "ready-to-start" : "not-ready"}
            onClick={startHand}
          >
            Start Hand
          </button>
        ) : null}
        {chipCount >= previousBet && isHandComplete ? (
          <button
            className="betting-option"
            onClick={keepSameBet}
            id={
              previousBet <= chipCount && previousBet > 0
                ? "ready-to-start"
                : "not-ready"
            }
          >
            Same Bet
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default App;
