import { map, concat, filter, includes, cloneDeep } from 'lodash';

export default function() {
  const userid = this.props.userid;
  const $this = this;

  
  this.props.socket.registerHandler(function(e){
    const userList = $this.state.userList;
    if(userid != e.userid) {
      $this.setState({userList: userList.concat(e)});
      if((userList.length === $this.props.numOfPlayers-2) || 
      (!$this.props.creator && userList.length === $this.props.numOfPlayers)) {
        $this.setState({letTheGamesBegin: true});
        if($this.props.creator) {
          $this.props.socket.startGame({id: $this.props.roomNumber}, (e)=>console.log(e));
        }
      }
    }
  });


  this.props.socket.registerStartingCards(function(e){
    const handCards = filter($this.state.allCards, (card, index)=>{
      if(includes(e, card.key)) {
        return true;
      }
    })
    $this.setState({handCards});
  });


  this.props.socket.registerStarter(function(e){
    if(e === $this.props.userid) {
      $this.setState({starter: $this.props.username});
      setTimeout(() => {
        $this.hideWaitModal();
        $this.setState({selfTimer: 1});
      }, 1000);
    }
    else {
      let us = cloneDeep($this.state.userList);
      map(us, u => {
        if(e === u.userid) {
          u.setTimer = 1;
          u.timerActive = true;
          $this.setState({starter: u.name});
        }
      });
      setTimeout(() => {
        $this.setState({ userList: us });
        $this.hideWaitModal();
      }, 1000);
    }
  });

  
  this.props.socket.registerDroppedCard(function(c){
    if(c.userid !== $this.props.userid) {
      const matCards = [ ...$this.state.matCards ];
      matCards.push($this.state.allCards[c.card]);
      $this.setState({matCards});
    }
    if(c.nextPlayer === $this.props.userid) {
      if(c.action === "closeRound" || "pettu") {
        setTimeout(()=>{
          $this.setState({selfTimer: 1});
        },1000);
      }
      else {
        $this.setState({selfTimer: 1});
      }
    }
    if(c.action === "continueRound") {
      setTimers(c, $this);
    }
    if(c.action === "pettu") {
      setTimeout(()=>{
        setTimers(c, $this);
        if(c.nextPlayer === $this.props.userid) {
          $this.setState({
            handCards: concat($this.state.handCards, $this.state.matCards),
          });
        }
        else {
          checkEmptyHand(c.nextPlayer);
        }
        $this.setState({
          matCards: [],
        });
      },750);
    }
    if(c.action === "closeRound") {
      setTimeout(()=>{
        setTimers(c, $this);
        $this.setState({
          closedCards: $this.state.closedCards + parseInt($this.props.numOfPlayers),
          matCards: [],
        });
      },750);
      checkEmptyHand(c.nextPlayer);
    }
  });
              
  function setTimers(card, $this) {
    let us = { ...$this.state.userList };
    map(us, u => {
      if(card.nextPlayer === u.userid) {
        u.setTimer = 1;
        u.timerActive = true;
      }
      else {
        u.setTimer = 0;
        u.timerActive = false;
      }
      $this.setState({ userList: us, });
    });
  }

  this.props.socket.someOneFinished(function(e){
    const userList = { ...$this.state.userList };
    if(e.userid === $this.props.userid) {
      let finisher;
      if(e.place === 1) {
        $this.setState({iWon: true });
      }
      else if(e.place === 2) {
        finisher = "2nd";
      }
      else if(e.place === 3) {
        finisher = "3rd";
      }
      else {
        finisher = e.place+"th";
      }
      if(finisher) {
        $this.setState({iFinished: finisher });
      }
    }
    else {
      map(userList, u => {
        if(e.userid === u.userid) {

          if(e.place === 1) {
              u.iWon = true;
            }
            else if(e.place === 2) {
              u.finisher = "2nd";
            }
            else if(e.place === 3) {
              u.finisher = "3rd";
            }
            else {
              u.finisher = e.place+"th";
            }
        }
      });
      $this.setState({userList});
    }
    if(e.gameOver) {
      let loser;
      if(e.loserid === $this.props.userid) {
        loser = "You";
      }
      else {
        map(userList, u => {
          if(e.loserid === u.userid) {
            loser = u.name;
          }
        });
      }
      $this.setState({gameOver: true, loser});
    }
  });

  function checkEmptyHand(nextPlayer) {
    if($this.state.handCards.length === 0) {
      const user = {userid: $this.props.userid, room: $this.props.roomNumber};
      if(nextPlayer === $this.state.userid) {
        user["nextPlayerEmptyHand"] = true;
      }
      $this.props.socket.iFinished(user, (e, ack) => {
        });
    }
  }
}