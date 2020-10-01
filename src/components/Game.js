import React from 'react';
import '../stylesheets/Game.css'

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

    return(
        <div className="game-div">
            <div className="dealers-cards-div">
                <h1>{handScore("dealer", props.dealersCards)}</h1>
                {props.dealersCards.join(" - ")}
            </div>
            <div className="players-cards-div">
                {props.playersCards.join(" - ")}
                <h1>{handScore("player", props.playersCards)}</h1>
            </div>
            <section className="gameplay-options">
                <button onClick={props.handleHit}>Hit</button>
                <button onClick={props.handleStay}>Stay</button>
                <button onClick={props.handleDouble}>Double</button>
                <button onClick={props.handleSplit}>Split</button>
            </section>
            <section className="betting-options">
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
        </div>
    )
}