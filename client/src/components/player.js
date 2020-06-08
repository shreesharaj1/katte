// Comment.js
import React from 'react';
import PropTypes from 'prop-types';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

import BackImg from '../imgs/back.png';
import Avatar from '../imgs/avatar.png';
import Crown from '../imgs/crown1.png';

function Player(props) {

    return (
      <div className="player">
        { props.user && props.user.iWon &&
              <div className = "crown_holder">
                <img src={Crown} className="crown"></img>
              </div>
            }
            { props.user && props.user.finished &&
              <div className = "place_holder">
                <h3 className="place">{this.state.iFinished} Place </h3>
              </div>
            }
        <CountdownCircleTimer
            ariaLabel="timer"
            isPlaying={props.user && props.user.setTimer}
            duration={20}
            colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
            size="90"
            strokeWidth="7"
            strokeLinecap="square"
            key={props.user && props.user.setTimer}
          >
            {({ remainingTime, animatedColor }) => (
              <div style={{ color: animatedColor }}>
                <img className="avatar" src={Avatar} />
                <div className={props.user && props.user.setTimer ? `avatar_overlay`: ''} ></div>
              </div>
            )}
        </CountdownCircleTimer>
        { props.user &&
          <div>
            <div className="player_name">{props.user.name}</div>
            <div className="card-back"><img src={BackImg}/></div>
            <div className="card-back"><img src={BackImg}/></div>
            <div className="card-back"><img src={BackImg}/></div>
            <div className="card-back"><img src={BackImg}/></div>
            <div className="card-back"><img src={BackImg}/></div>
            <div className="card-back"><img src={BackImg}/></div>
            <div className="card-back"><img src={BackImg}/></div>
            <div className="card-back"><img src={BackImg}/></div>
          </div>
        }
      </div>
    );

  }

  Player.propTypes = {
    suite: PropTypes.string,
    playerKey: PropTypes.string,
    };
  
  Player.defaultProps = {
    playerKey: "abc",
    };

export default Player;