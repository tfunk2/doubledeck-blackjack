import React from "react";
import "../stylesheets/Game.css";
import CardBack from "../images/card-back.png";
import BlankChip from "../images/blank-chip.png";
import AceOfH from "../images/AH.png";
import TwoOfH from "../images/2H.png";
import ThreeOfH from "../images/3H.png";
import FourOfH from "../images/4H.png";
import FiveOfH from "../images/5H.png";
import SixOfH from "../images/6H.png";
import SevenOfH from "../images/7H.png";
import EightOfH from "../images/8H.png";
import NineOfH from "../images/9H.png";
import TenOfH from "../images/10H.png";
import JackOfH from "../images/JH.png";
import QueenOfH from "../images/QH.png";
import KingOfH from "../images/KH.png";
import AceOfC from "../images/AC.png";
import TwoOfC from "../images/2C.png";
import ThreeOfC from "../images/3C.png";
import FourOfC from "../images/4C.png";
import FiveOfC from "../images/5C.png";
import SixOfC from "../images/6C.png";
import SevenOfC from "../images/7C.png";
import EightOfC from "../images/8C.png";
import NineOfC from "../images/9C.png";
import TenOfC from "../images/10C.png";
import JackOfC from "../images/JC.png";
import QueenOfC from "../images/QC.png";
import KingOfC from "../images/KC.png";
import AceOfD from "../images/AD.png";
import TwoOfD from "../images/2D.png";
import ThreeOfD from "../images/3D.png";
import FourOfD from "../images/4D.png";
import FiveOfD from "../images/5D.png";
import SixOfD from "../images/6D.png";
import SevenOfD from "../images/7D.png";
import EightOfD from "../images/8D.png";
import NineOfD from "../images/9D.png";
import TenOfD from "../images/10D.png";
import JackOfD from "../images/JD.png";
import QueenOfD from "../images/QD.png";
import KingOfD from "../images/KD.png";
import AceOfS from "../images/AS.png";
import TwoOfS from "../images/2S.png";
import ThreeOfS from "../images/3S.png";
import FourOfS from "../images/4S.png";
import FiveOfS from "../images/5S.png";
import SixOfS from "../images/6S.png";
import SevenOfS from "../images/7S.png";
import EightOfS from "../images/8S.png";
import NineOfS from "../images/9S.png";
import TenOfS from "../images/10S.png";
import JackOfS from "../images/JS.png";
import QueenOfS from "../images/QS.png";
import KingOfS from "../images/KS.png";

export default function Game({
  randomizedDecks,
  playersCards,
  dealersCards,
  chipCount,
  setChipCount,
  betAmount,
  setBetAmount,
  playerCount,
  setPlayerCount,
  dealerCount,
  setDealerCount,
  handleHit,
  handleStay,
  handleDouble,
  lockedBet,
  handleLockedBet,
  isHandComplete,
  isDealersTurn,
  isPlayerBusted,
  isDealerBusted,
  didDouble,
  startHand,
  handleBet,
  previousBet,
  winner,
  isBlackjack,
  clearLockedBet,
}) {
  const whichImages = (who, cards) => {
    return cards.map((card) => {
      let findImage;
      switch (card) {
        case "A of Hearts":
          findImage = AceOfH;
          break;
        case "2 of Hearts":
          findImage = TwoOfH;
          break;
        case "3 of Hearts":
          findImage = ThreeOfH;
          break;
        case "4 of Hearts":
          findImage = FourOfH;
          break;
        case "5 of Hearts":
          findImage = FiveOfH;
          break;
        case "6 of Hearts":
          findImage = SixOfH;
          break;
        case "7 of Hearts":
          findImage = SevenOfH;
          break;
        case "8 of Hearts":
          findImage = EightOfH;
          break;
        case "9 of Hearts":
          findImage = NineOfH;
          break;
        case "10 of Hearts":
          findImage = TenOfH;
          break;
        case "J of Hearts":
          findImage = JackOfH;
          break;
        case "Q of Hearts":
          findImage = QueenOfH;
          break;
        case "K of Hearts":
          findImage = KingOfH;
          break;
        case "A of Clubs":
          findImage = AceOfC;
          break;
        case "2 of Clubs":
          findImage = TwoOfC;
          break;
        case "3 of Clubs":
          findImage = ThreeOfC;
          break;
        case "4 of Clubs":
          findImage = FourOfC;
          break;
        case "5 of Clubs":
          findImage = FiveOfC;
          break;
        case "6 of Clubs":
          findImage = SixOfC;
          break;
        case "7 of Clubs":
          findImage = SevenOfC;
          break;
        case "8 of Clubs":
          findImage = EightOfC;
          break;
        case "9 of Clubs":
          findImage = NineOfC;
          break;
        case "10 of Clubs":
          findImage = TenOfC;
          break;
        case "J of Clubs":
          findImage = JackOfC;
          break;
        case "Q of Clubs":
          findImage = QueenOfC;
          break;
        case "K of Clubs":
          findImage = KingOfC;
          break;
        case "A of Diamonds":
          findImage = AceOfD;
          break;
        case "2 of Diamonds":
          findImage = TwoOfD;
          break;
        case "3 of Diamonds":
          findImage = ThreeOfD;
          break;
        case "4 of Diamonds":
          findImage = FourOfD;
          break;
        case "5 of Diamonds":
          findImage = FiveOfD;
          break;
        case "6 of Diamonds":
          findImage = SixOfD;
          break;
        case "7 of Diamonds":
          findImage = SevenOfD;
          break;
        case "8 of Diamonds":
          findImage = EightOfD;
          break;
        case "9 of Diamonds":
          findImage = NineOfD;
          break;
        case "10 of Diamonds":
          findImage = TenOfD;
          break;
        case "J of Diamonds":
          findImage = JackOfD;
          break;
        case "Q of Diamonds":
          findImage = QueenOfD;
          break;
        case "K of Diamonds":
          findImage = KingOfD;
          break;
        case "A of Spades":
          findImage = AceOfS;
          break;
        case "2 of Spades":
          findImage = TwoOfS;
          break;
        case "3 of Spades":
          findImage = ThreeOfS;
          break;
        case "4 of Spades":
          findImage = FourOfS;
          break;
        case "5 of Spades":
          findImage = FiveOfS;
          break;
        case "6 of Spades":
          findImage = SixOfS;
          break;
        case "7 of Spades":
          findImage = SevenOfS;
          break;
        case "8 of Spades":
          findImage = EightOfS;
          break;
        case "9 of Spades":
          findImage = NineOfS;
          break;
        case "10 of Spades":
          findImage = TenOfS;
          break;
        case "J of Spades":
          findImage = JackOfS;
          break;
        case "Q of Spades":
          findImage = QueenOfS;
          break;
        case "K of Spades":
          findImage = KingOfS;
          break;
      }
      if (who === "dealer" && parseInt(cards.indexOf(card)) === 1) {
        return (
          <img
            className="card-img"
            alt={card}
            src={isDealersTurn ? findImage : CardBack}
          ></img>
        );
      }
      return (
        <img
          className={
            didDouble && cards.indexOf(card) === 2 && who === "player"
              ? "sideways-double-card"
              : "card-img"
          }
          alt={card}
          src={findImage}
        ></img>
      );
    });
  };

  return (
    <div className="game-div">
      <div className="dealers-cards-div">
        <h1 className="count">
          {isDealersTurn ? dealerCount : null}
        </h1>
        {whichImages("dealer", dealersCards)}
      </div>
      <div className="chip-or-message">
        {lockedBet > 0 || !isHandComplete ? (
          <div className="empty-chip-container">
            <div className="locked-bet-amount">
              {isHandComplete ? lockedBet : previousBet}
            </div>
            <img
              className="locked-bet-img"
              onClick={clearLockedBet}
              src={BlankChip}
            ></img>
          </div>
        ) : null}
        <h1 className="result-message">
          {winner === "player" && isBlackjack
            ? `Blackjack! Player wins ${
                previousBet + previousBet * 1.5
              }`
            : winner === "player" && didDouble
            ? `Player doubles and wins ${previousBet * 4}`
            : winner === "player" && isDealerBusted
            ? `Dealer busted! Player wins ${previousBet * 2}`
            : winner === "dealer" && didDouble
            ? `Player doubled and lost ${previousBet * 2}`
            : winner === "dealer" && isBlackjack
            ? `Dealer Blackjack. Player lost ${previousBet}`
            : winner === "dealer" &&
              isPlayerBusted &&
              didDouble
            ? `Player busted on double. Lost ${previousBet * 2}`
            : winner === "dealer" && isPlayerBusted
            ? `Player busted. Lost ${previousBet}`
            : winner === "dealer"
            ? `Player lost ${previousBet}`
            : winner === "player"
            ? `Player wins ${previousBet * 2}`
            : winner === "push" && didDouble
            ? `Pushed back ${previousBet * 2}`
            : winner === "push"
            ? `Pushed back ${previousBet}`
            : null}
        </h1>
      </div>
      <div className="players-cards-div">
        {whichImages("player", playersCards)}
        <h1 className="count">
          {playerCount > 0 ? playerCount : null}
        </h1>
      </div>
      <section className="gameplay-options">
        {!isHandComplete ? (
          <>
            <button
              className="betting-option"
              id={
                !isDealersTurn && playerCount < 21
                  ? "ready-to-start"
                  : "not-ready"
              }
              onClick={handleHit}
            >
              Hit
            </button>
            <button
              className="betting-option"
              id={
                !isDealersTurn &&
                playerCount <= 21 &&
                !didDouble
                  ? "ready-to-start"
                  : "not-ready"
              }
              onClick={handleStay}
            >
              Stay
            </button>
            <button
              className="betting-option"
              id={
                !isDealersTurn &&
                playersCards.length === 2 &&
                chipCount >= previousBet
                  ? "ready-to-start"
                  : "not-ready"
              }
              onClick={handleDouble}
            >
              Double
            </button>
            {/* <button onClick={handleSplit}>Split</button> */}
          </>
        ) : (
          <></>
        )}
      </section>
    </div>
  );
}
