// Game.js
import React, { Component } from 'react';
import Card from '../components/card';
import DATA from '../data';
import '../css/app.css';

class Game extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }
  render() {
    return (
      <div className="container">
          <Card suite="clubs" value="10" />
          <Card suite="hearts" />
      </div>
    );
  }
}

export default Game;