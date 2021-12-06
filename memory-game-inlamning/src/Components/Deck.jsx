import React from "react";
import { useState, useEffect } from "react";
import Card from "./Card";
import "./Deck.css";

function Deck() {
  const [deck, setDeck] = useState([]);
  const [clicked, setClicked] = useState([]);

  const [matchedCards, setMatchedCards] = useState([]);

  useEffect(() => {
    async function getDeck() {
      const res = await fetch(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?cards=QS,QS,JS,JS,KS,KS,AD,AD,2D,2D,0D,0D"
      );
      const data = await res.json();
      const res2 = await fetch(
        `https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=12`
      );
      const data2 = await res2.json();
      setDeck(data2.cards);
    }
    getDeck();
  }, []);

  useEffect(() => {
    if (clicked.length > 1) {
      setTimeout(() => {
        setClicked([]);
      }, 500);
    } else if (clicked.length > 1 && clicked[0] === clicked[1]) {
      clicked.length = 0;
    }
  }, [clicked]);

  useEffect(() => {
    if (clicked.length > 1) {
      if (deck[clicked[0]].code === deck[clicked[1]].code) {
        matchedCards.push(deck[clicked[0]].code, deck[clicked[1]].code);
        if (matchedCards.length === 12) {
          alert("Good job!");
          window.location.reload();
        }
        console.log(matchedCards.length);
      }
    }
  }, [clicked, deck]);

  const chosenCard = (index) => {
    setClicked(() => [...clicked, index]);
  };

  return (
    <div>
      <div className="headerDiv">
      <img width="400px" src="https://images.unsplash.com/photo-1600430086946-2d9fc61bbefc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt=" "/>
        
        <h1>Memory Game</h1>
      </div>
      <div className="container">
        {deck &&
          deck.map((card, index) => (
            <Card
              image={card.image}
              suit={card.suit}
              deck={card}
              key={index}
              alt="?"
              onClick={() => chosenCard(index)}
              targeted={
                clicked.includes(index) || matchedCards.includes(card.code)
              }
            />
          ))}
      </div>
    </div>
  );
}
export default Deck;
