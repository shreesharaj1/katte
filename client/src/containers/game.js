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
    imgW = imgs[0].getBoundingClientRect().height,
    // get the dimensions of the inner circle we want the images to align to
    radius2 = radius + 100;

    var i,
        alpha = Math.PI / 2,
        len = imgs.length,
        corner = 2 * Math.PI / total;

    // loop over the images and assign the correct css props
    for ( i = 0 ; i < total; i++ ){
      var offsetAngle = 360 / imgs.length;
      var rotateAngle = offsetAngle * i;
      imgs[i].style.transform = "rotate(" + rotateAngle + "deg) translate(" + radius + "px, 0px) rotate(-" + rotateAngle + "deg)";
      //imgs[i].style.top =  parseInt( ( radius - imgW / 2 ) - ( radius2 * Math.sin( alpha ) ) ) + 'px'

      alpha = alpha - corner;
    }
  }

  render() {
    return (
      <div className="container">
          <div className="hand">
            {/*this.state.handCards*/}
           </div> 
          <div className="carpet" 
            onDragOver={(e)=>this.onDragOver(e)}
            onDrop={(e)=>this.onDrop(e, "complete")}>
            {this.state.matCards}
            <div class="player">P</div>
            <div class="player">P</div>
          </div>
      </div>
    );
  }
}

export default Game;