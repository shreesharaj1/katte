// Game.js
import React, { Component } from 'react';
import Card from '../components/card';
import '../css/app.css';

class Game extends Component {
  constructor() {
    super();
    const handCards = [<Card onDragStart={(e)=>this.onDragStart(e, "c1")} suite="clubs" value="10" id="c1" key="c1" />,
            <Card onDragStart={(e)=>this.onDragStart(e, "c2")} suite="hearts" value="J" id="c2" key="c2" />]
    this.state = { matCards: [], handCards };
  }

  onDragStart = (ev, id) => {
    console.log('dragstart:',id);
    ev.dataTransfer.setData("id", id);
  }

  onDragOver = (ev) => {
      ev.preventDefault();
  }

  onDrop = (ev, cat) => {
     let id = ev.dataTransfer.getData("id");
     let handCards = this.state.handCards;
     let matCards = this.state.matCards;
     handCards = handCards.filter((card) => {
         if (card.props.id == id) {
             matCards.push(card);
             //handCards.remove(card);
             return false;
         }
         return true;
     });

     this.setState({
         handCards, matCards
     });
  }

  render() {
    return (
      <div className="container">
          <div className="hand">
            {this.state.handCards}
           </div> 
          <div className="carpet" 
            onDragOver={(e)=>this.onDragOver(e)}
            onDrop={(e)=>this.onDrop(e, "complete")}>
            {this.state.matCards}
          </div>
      </div>
    );
  }
}

export default Game;