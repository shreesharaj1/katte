// Game.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { Redirect } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import { map, times, filter, find } from 'lodash';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Avatar from '../imgs/avatar.png';
import Card from '../components/card';
import Player from '../components/player';
import gameUtil from '../utils/gameUtil';
import '../css/app.css';
import BackImg from '../imgs/back.png';
import Crown from '../imgs/crown1.png';
import Katte from '../imgs/katte.gif';

class Game extends Component {
  constructor(props) {
    super(props);
    //const handCards = [<Card onDragStart={(e)=>this.onDragStart(e, "c1")} suite="clubs" value="10" id="c1" key="c1" />,
    //        <Card onDragStart={(e)=>this.onDragStart(e, "c2")} suite="hearts" value="J" id="c2" key="c2" />]
    //this.state = { matCards: [], handCards };
    let handCards = [];
    const names = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
	  const suits = ['spades','hearts','clubs','diamonds'];
	  let cards = {};
    
    for( let s = 0; s < suits.length; s++ ) {
        for( let n = 0; n < names.length; n++ ) {
            cards[suits[s][0]+names[n]] = <Card onDragStart={(e)=>this.onDragStart(e, suits[s][0]+names[n])} 
              onMouseDown={(e)=> this.onMouseDown(e)}
              onMouseUp={(e)=> this.onMouseUp(e)}
              onDragEnd={(e)=> this.onDragEnd(e)}
              suite={suits[s]} value={names[n]} id={suits[s][0]+names[n]} key={suits[s][0]+names[n]} />;
        }
    }
    
    this.state = { 
      matCards: [], 
      handCards: [],
      allCards: cards,
      showWaitModal: false,
      userList: [],
      letTheGamesBegin: false,
      selfTimer: false,
      starter: '',
      timerActive: false,
      closedCards: 0,
      iWon: false,
      iFinished: false,
      gameOver: false,
     };
    this.onDrop = this.onDrop.bind(this);
    this.randomCardIndex = this.randomCardIndex.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.hideWaitModal = this.hideWaitModal.bind(this);
    this.hideGameOverModal = this.hideGameOverModal.bind(this);
  }

  randomCardIndex = () => {
    return Math.floor(Math.random() * 51) + 1;
  }

  onDragStart = (ev, id) => {
    console.log('dragstart:',id);
    ev.dataTransfer.setData("id", id);
  }

  onDragOver = (ev) => {
      ev.preventDefault();
  }
  
  hideWaitModal = (ev) => {
      this.setState({showWaitModal: false})
  }
  
  hideGameOverModal = (ev) => {
      this.setState({ gameOver: false })
  }

  onDrop = (ev, cat) => {
     let id = ev.dataTransfer.getData("id");
     let handCards = this.state.handCards;
     let matCards = this.state.matCards;
     if(this == undefined){
      console.log("cat");
      console.log(this);
    }
    if(this.state.selfTimer) {
      let dealCondition = false;
      if(matCards.length > 0) {
        if(matCards[0].key[0] === id[0]) {
          dealCondition = true;
        }
        else {
          const suiteOver = !find(handCards, (card) => { 
            return card.key[0] === matCards[0].key[0]
          });
          dealCondition = suiteOver;
        }
      }
      else {
        dealCondition = true;
      }
      if(dealCondition) {
        const cardObj = {card:id, userid: this.props.userid, room: this.props.roomNumber};
        this.props.socket.dropCard(cardObj, (e, ack) => {
          
        });

        handCards = handCards.filter((card) => {
          if(card == undefined){
            console.log("cat");
            console.log(handCards);
          }
            if (card.props.id == id) {
                matCards.push(card);
                return false;
            }
            return true;
        });

        this.setState({
            handCards, matCards, selfTimer: 0,
        });
      }
    }
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
    if(this.props.existingUsers) {
      const userid = this.props.userid;
      const list = filter(this.props.existingUsers, u => {
        if(u.userid !== userid) {
          return {userid: u.userid, name: u.name}
        }
        return false;
      });
      this.setState({userList: list});
    }
    if(this.props.lastJoinee) {
      this.setState({letTheGamesBegin: true});
    }
    if(this.props.socket) {
      gameUtil.call(this);
    }
    var circle = document.getElementsByClassName('carpet')[0],
    imgs = document.getElementsByClassName('player'),
    total = imgs.length,
    coords = {}, radius1;
    // get circle diameter
    // getBoundingClientRect outputs the actual px AFTER transform
    //      using getComputedStyle does the job as we want
    if(circle && window.getComputedStyle(circle)){
    let diam = parseInt( window.getComputedStyle(circle).getPropertyValue('height') ),
    //radius = diam/2,
    imgW = imgs[0].getBoundingClientRect().height;
    // get the dimensions of the inner circle we want the images to align to
    // loop over the images and assign the correct css props
      let outerRadius = diam / 2
      , innerRadius = (outerRadius - (-70)) - imgW
      , alpha = Math.PI / 2
      , corner = 2 * Math.PI / total
      ;
    var a =36;


    var startAngle = Math.PI / imgs.length,
    angle = startAngle / 2,
    radius = 300,
    offset = 120;
    for ( let i = 0; i < total; i++ ){
      imgs[i].style.left = radius * Math.cos( angle ) + offset + "px";
      imgs[i].style.top = -1*(radius * Math.sin( angle )) + 200+ "px";
      angle += startAngle;
      // imgs[i].style.left = parseInt( ( outerRadius - imgW / 2 ) + ( innerRadius * Math.cos( alpha ) ) -50) + 'px';
      // imgs[i].style.top = parseInt( ( outerRadius - imgW / 2 ) - ( innerRadius * Math.sin( alpha ) ) )+ 'px';

      alpha = alpha - corner;
    }
  }
    this.setState({showWaitModal:true});
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {

    if(!this.props.roomNumber) {
      return (
        <Redirect to="/room"></Redirect>
      )
    }
    else {
      return (
        <div className="game-container">
          <div className="game-area">
            <div className="carpet">
              {this.props.numOfPlayers && times(this.props.numOfPlayers-1, (i) =>
                <Player key={`player${i}`} user={this.state.userList[i]} />
              )
              }
            </div>
            <div className="carpet-absolute" 
              onDragOver={(e)=>this.onDragOver(e)}
              onDrop={(e)=>this.onDrop(e, "complete")}>
              <div>
                {this.state.matCards}
              </div>
                <div className="side_cards">
                  <TransitionGroup>
                    { times(this.state.closedCards, (i) =>
                      <CSSTransition key={i} timeout={200} classNames="card-back">
                        <div className="card-back"><img src={BackImg}/></div>
                      </CSSTransition>
                      )
                    }
                  </TransitionGroup>
                </div>
            </div>
            <div className="self hand">
                {this.state.handCards}
            </div>
            { this.state.iWon &&
              <div className = "crown_holder">
                <img src={Crown} className="crown"></img>
              </div>
            }
            { this.state.iFinished &&
              <div className = "place_holder">
                <h3 className="place">{this.state.iFinished} Place </h3>
              </div>
            }
            <div className="self_player">
              <CountdownCircleTimer
                ariaLabel="timer"
                isPlaying={this.state.selfTimer}
                duration={20}
                colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
                size="90"
                strokeWidth="7"
                strokeLinecap="square"
                key={this.state.selfTimer}
              >
                {({ remainingTime, animatedColor }) => (
                  <div style={{ color: animatedColor }}>
                    <img className="avatar" src={Avatar} />
                    <div className={this.state.selfTimer ? `avatar_overlay`: ''} ></div>
                  </div>
                )}
              </CountdownCircleTimer>
              <div className="player_name">{this.props.username}</div>
            </div>
          </div>
          <Modal
                className="k-modal"
                show={this.state.showWaitModal}
                onHide={this.hideWaitModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Body>
                  <div className="wait_modal">
                    { !this.state.letTheGamesBegin &&
                      <div>
                        <div className="d-flex justify-content-center">
                          <div className="spinner-grow text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                          <div className="spinner-grow text-secondary" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                          <div className="spinner-grow text-success" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                          <div className="spinner-grow text-danger" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                        <div className="creating-txt">Waiting for others to join..</div>
                      </div>
                    }
                    <div className="row justify-content-center">
                      <div className="col-md-auto">
                        <div className="alert alert-info">
                          Share this room code: {this.props.roomNumber}
                          {this.state.starter && 
                            <div>{this.state.starter} to start</div>
                          }
                        </div>
                        <ul className="join_list">
                          {map(this.state.userList, (s,i) => 
                            <li key={`list_${i}`}>{s && s.name} has joined</li>
                          )} 
                        </ul>
                        { this.state.letTheGamesBegin &&
                          <CountdownCircleTimer
                            ariaLabel="begin_timer"
                            isPlaying
                            duration={5}
                            colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
                          >
                            {({ remainingTime }) => 
                              <div className="timer_text">
                                <div className="text">Starting in</div>
                                <div className="value">{remainingTime}</div>
                                <div className="text">seconds</div>
                            </div>
                            }
                          </CountdownCircleTimer>

                        }
                      </div>
                    </div>
                  </div>
                </Modal.Body>
            </Modal>
            <Modal
                className="k-modal"
                show={this.state.gameOver}
                onHide={this.hideGameOverModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Body>
                  <div className="wait_modal">
                    <h1 className="katte_text">{this.state.loser} Lost</h1>
                    <img src={Katte} className="katte"></img>
                  </div>
                </Modal.Body>
            </Modal>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return state.GameReducer;
}

const mapDispatchToProps = dispatch => ({
  //createRoomAction: (roomObj) => { dispatch(createRoom(roomObj)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Game); 
