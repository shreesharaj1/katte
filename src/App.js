import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import './cards.css';
import '../node_modules/deck-of-cards/example/example.css';
import { shuffle, newDecks } from '52-deck'
import Deck from 'deck-of-cards';
import Card from 'react-playing-card'

const deck = shuffle(newDecks(2))

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          Hearts
        </div>
        <p className="App-intro">
          
        </p>
      </div>
    );
  }
}



class Game extends React.Component {

  componentDidMount() {
    /*this.$el = this.el;
    var deck = Deck();
    console.log(this.el);
    deck.mount(this.$el);
    deck.fan();

    deck.cards.forEach(function (card, i) {
                card.setSide(Math.random() < 0.5 ? 'front' : 'back');

                // explode
                card.animateTo({
                    delay: 1000 + i * 2, // wait 1 second + i * 2 ms
                    duration: 500,
                    ease: 'quartOut',

                    x: Math.random() * window.innerWidth - window.innerWidth / 2,
                    y: Math.random() * window.innerHeight - window.innerHeight / 2
                });
            });*/
  }

  componentWillUnmount() {
    deck.unmount();
  } 
  
  render() {
    return (
      <div>
        <App />
        <div className="game">
         {/* <div ref={el => this.el = el} />; */}
          <Card rank="A" suit="S" />
        </div>
      </div>
    );
  }
}



// ========================================
export default Game;
