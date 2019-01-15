// Game.js
import React, { Component } from 'react';
import Card from '../components/card';
import Player from '../components/player';
import '../css/app.css';

class Game extends Component {
  constructor() {
    super();
    //const handCards = [<Card onDragStart={(e)=>this.onDragStart(e, "c1")} suite="clubs" value="10" id="c1" key="c1" />,
    //        <Card onDragStart={(e)=>this.onDragStart(e, "c2")} suite="hearts" value="J" id="c2" key="c2" />]
    //this.state = { matCards: [], handCards };
    let handCards = [];
    const names = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
	  const suits = ['spades','hearts','clubs','diamonds'];
	  let cards = [];
    
    for( let s = 0; s < suits.length; s++ ) {
        for( let n = 0; n < names.length; n++ ) {
            cards.push( <Card onDragStart={(e)=>this.onDragStart(e, suits[s][0]+names[n])} 
              onMouseDown={(e)=> this.onMouseDown(e)}
              onMouseUp={(e)=> this.onMouseUp(e)}
              onDragEnd={(e)=> this.onDragEnd(e)}
              suite={suits[s]} value={names[n]} id={suits[s][0]+names[n]} key={suits[s][0]+names[n]} />);
        }
    }
    let uniqueRandom = [];
    for(let i = 0; i < 13; i++) {
      let randomIndex = this.randomCardIndex();
      if(!uniqueRandom.includes(randomIndex)) {
        uniqueRandom.push(randomIndex);
      }
    }
    uniqueRandom.sort(function(a, b) {
      return a - b;
    });
    uniqueRandom.map((r)=> {
      handCards.push(cards[r]);
    })
    this.state = { matCards: [], handCards };
  }

  randomCardIndex = () => {
    return Math.floor(Math.random() * 52) + 1;
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
             return false;
         }
         return true;
     });

     this.setState({
         handCards, matCards
     });
  }

  onMouseDown = (ev)=> {
    console.log("ev");
    ev.target.style.zIndex=1;
  }

  onMouseUp = (ev)=> {
    console.log("sd");
    ev.target.style.zIndex=0;
  }

  onDragEnd = (ev) => {
    ev.target.style.zIndex=0;
}

  componentDidMount(){
    var circle = document.getElementsByClassName('carpet')[0],
    imgs = document.getElementsByClassName('player'),
    total = imgs.length,
    coords = {}, radius1;
    // get circle diameter
    // getBoundingClientRect outputs the actual px AFTER transform
    //      using getComputedStyle does the job as we want
    let diam = parseInt( window.getComputedStyle(circle).getPropertyValue('height') ),
    radius = diam/2,
    imgW = imgs[0].getBoundingClientRect().height;
    // get the dimensions of the inner circle we want the images to align to
    // loop over the images and assign the correct css props
      let outerRadius = diam / 2
      , innerRadius = (outerRadius - (-50)) - imgW
      , alpha = Math.PI / 2
      , corner = 2 * Math.PI / total
      ;

  for ( let i = 0; i < total; i++ ){

    imgs[i].style.left = parseInt( ( outerRadius - imgW / 2 ) + ( innerRadius * Math.cos( alpha ) ) -50) + 'px';
    imgs[i].style.top = parseInt( ( outerRadius - imgW / 2 ) - ( innerRadius * Math.sin( alpha ) ) )+ 'px';

    alpha = alpha - corner;
    }
  }

  render() {
    return (
      <div className="container">
        <div className="game-area">
          <div className="carpet">
              <Player/>
            <Player/>
            <div className="player">P</div>
          </div>
          <div className="carpet-absolute" 
            onDragOver={(e)=>this.onDragOver(e)}
            onDrop={(e)=>this.onDrop(e, "complete")}>
            {this.state.matCards}
          </div>
          <div className="self hand">
              {this.state.handCards}
          </div>
        </div>
      </div>
    );
  }
}

export default Game;