// Game.js
import React, { Component, useState } from 'react';
import Card from '../components/card';
import '../css/app.css';

export default function Game () {
  const handCardsInit = [<Card onDragStart={(e)=>onDragStart(e, "c1")} suite="clubs" value="10" id="c1" key="c1" />,
    <Card onDragStart={(e)=>onDragStart(e, "c2")} suite="hearts" value="J" id="c2" key="c2" />];
  const [handCards, setHandCards] = useState(handCardsInit);
  const [matCards, setMatCards] = useState();

  function onDragStart (ev, id) {
    console.log('dragstart:',id);
    ev.dataTransfer.setData("id", id);
  }

  function onDragOver (ev) {
      ev.preventDefault();
  }

  function onDrop (ev, cat) {
     let id = ev.dataTransfer.getData("id");
     let newMatcards = matCards ? matCards : [];
     let newHandCards = handCards.filter((card) => {
         if (card.props.id == id) {
             newMatcards.push(card);
             //handCards.remove(card);
             return false;
         }
         return true;
     });
     setHandCards(newHandCards);
     setMatCards(newMatcards);
  }

    return (
      <div className="container">
          <div className="hand">
            {handCards}
           </div> 
          <div className="carpet" 
            onDragOver={(e)=>onDragOver(e)}
            onDrop={(e)=>onDrop(e, "complete")}>
            {matCards}
          </div>
      </div>
    );
}