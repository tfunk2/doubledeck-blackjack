import React from 'react';
import '../stylesheets/Game.css'
import AceOfH from '../images/AH.png'
import TwoOfH from '../images/2H.png'
import ThreeOfH from '../images/3H.png'
import FourOfH from '../images/4H.png'
import FiveOfH from '../images/5H.png'
import SixOfH from '../images/6H.png'
import SevenOfH from '../images/7H.png'
import EightOfH from '../images/8H.png'
import NineOfH from '../images/9H.png'
import TenOfH from '../images/10H.png'
import JackOfH from '../images/JH.png'
import QueenOfH from '../images/QH.png'
import KingOfH from '../images/KH.png'
import AceOfC from '../images/AC.png'
import TwoOfC from '../images/2C.png'
import ThreeOfC from '../images/3C.png'
import FourOfC from '../images/4C.png'
import FiveOfC from '../images/5C.png'
import SixOfC from '../images/6C.png'
import SevenOfC from '../images/7C.png'
import EightOfC from '../images/8C.png'
import NineOfC from '../images/9C.png'
import TenOfC from '../images/10C.png'
import JackOfC from '../images/JC.png'
import QueenOfC from '../images/QC.png'
import KingOfC from '../images/KC.png'
import AceOfD from '../images/AD.png'
import TwoOfD from '../images/2D.png'
import ThreeOfD from '../images/3D.png'
import FourOfD from '../images/4D.png'
import FiveOfD from '../images/5D.png'
import SixOfD from '../images/6D.png'
import SevenOfD from '../images/7D.png'
import EightOfD from '../images/8D.png'
import NineOfD from '../images/9D.png'
import TenOfD from '../images/10D.png'
import JackOfD from '../images/JD.png'
import QueenOfD from '../images/QD.png'
import KingOfD from '../images/KD.png'
import AceOfS from '../images/AS.png'
import TwoOfS from '../images/2S.png'
import ThreeOfS from '../images/3S.png'
import FourOfS from '../images/4S.png'
import FiveOfS from '../images/5S.png'
import SixOfS from '../images/6S.png'
import SevenOfS from '../images/7S.png'
import EightOfS from '../images/8S.png'
import NineOfS from '../images/9S.png'
import TenOfS from '../images/10S.png'
import JackOfS from '../images/JS.png'
import QueenOfS from '../images/QS.png'
import KingOfS from '../images/KS.png'


export default function Game(props) {

    const handleBet = (bet) => {
        if(props.chipCount >= bet) {
            props.setBetAmount(props.betAmount + bet)
            props.setChipCount(props.chipCount - bet)
        }
    }

    const handScore = (who, hand) => {
        let sortedHand = hand.sort()
        let tenRegex = /^[JQK]|^10/
        let numRegex = /^[2-9]/
        let aceRegex = /^A/

        let handCount = 0

        for(let i = 0; i < sortedHand.length; i++) {
            if(tenRegex.test(sortedHand[i])) {
                handCount += 10
            } else if (numRegex.test(sortedHand[i])) {
                handCount += parseInt(sortedHand[i].match(numRegex)[0])
            } else if (aceRegex.test(sortedHand[i])) {
                if(handCount <= 10) {
                    handCount += 11
                } else if(handCount + 11 > 21) {
                    handCount += 1
                }
            }
        }

        if(who === "dealer") {
            props.setDealerCount(handCount)
        }

        if(who === "player") {
            props.setPlayerCount(handCount)
        }

        return handCount
    }

    const whichImages = (cards) => {
        return cards.map(card => {
            let findImage;
            switch(card) {
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
            return <img className="card-img" alt={card} src={findImage}></img>
        })
    }

    return(
        <div className="game-div">
            <div className="dealers-cards-div">
                <h1>{handScore("dealer", props.dealersCards)}</h1>
                {props.dealersCards.join(" - ")}
                {whichImages(props.dealersCards)}
            </div>
            <div className="players-cards-div">
                {props.playersCards.join(" - ")}
                {whichImages(props.playersCards)}
                <h1>{handScore("player", props.playersCards)}</h1>
            </div>
            <section className="gameplay-options">
                <button onClick={props.handleHit}>Hit</button>
                <button onClick={props.handleStay}>Stay</button>
                <button onClick={props.handleDouble}>Double</button>
                <button onClick={props.handleSplit}>Split</button>
            </section>
            <section className="betting-options">
                <button onClick={props.handleLockedBet}>
                    Place Bet
                </button>
                {props.chipCount >= 5 ? <button onClick={() => handleBet(5)} className="not-enough">5</button> : null}
                {props.chipCount >= 25? <button onClick={() => handleBet(25)} className="not-enough">25</button> : null}
                {props.chipCount >= 100 ? <button onClick={() => handleBet(100)} className="not-enough">100</button> : null}
                {props.chipCount >= 500 ? <button onClick={() => handleBet(500)} className="not-enough">500</button> : null}
                {props.chipCount >= 1000 ? <button onClick={() => handleBet(1000)} className="not-enough">1000</button> : null}
                {props.chipCount >= 10000 ? <button onClick={() => handleBet(10000)} className="not-enough">10000</button> : null}
                {props.chipCount >= 50000 ? <button onClick={() => handleBet(50000)} className="not-enough">50000</button> : null}
                {props.chipCount >= 100000 ? <button onClick={() => handleBet(100000)} className="not-enough">100000</button> : null}
                {props.chipCount >= 500000 ? <button onClick={() => handleBet(500000)} className="not-enough">500000</button> : null}
                {props.chipCount >= 1000000 ? <button onClick={() => handleBet(1000000)} className="bet-button">1000000</button> : null}
            </section>
            {props.lockedBet > 0 && !props.isHandComplete ? <h1>{props.lockedBet} wagered!</h1> : <></>}
        </div>
    )
}