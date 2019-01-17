// Comment.js
import React from 'react';
import PropTypes from 'prop-types';
import BackImg from '../imgs/back.png';

class Player extends React.Component {

  render() {
    
    return (
      <div className="player">
          <div className="card-back"><img src={BackImg}/></div>
          <div className="card-back"></div>
          <div className="card-back"></div>
          <div className="card-back"></div>
          <div className="card-back"></div>
          <div className="card-back"></div>
          <div className="card-back"></div>
      </div>
    );

  Player.propTypes = {
    suite: PropTypes.string,
    };
  }
}

export default Player;