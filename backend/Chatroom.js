module.exports = function ({ name, id, creator, numOfPlayers }, client) {
  const members = {};
  const sockets = {};
  const indexedUsers = [];
  const roomName = name;
  const roomId = id;
  const num = numOfPlayers;
  const cardVals = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
  let currentRoundCards = {};
  const finishers = [];

  console.log(this);

  members[creator.userid] = creator;
  sockets[creator.userid] = client;
  indexedUsers[0] = creator.userid;

  function broadcastJoined(user) {
    for(const t in sockets){ 
      sockets[t].emit('joined', user);
    }
  }

  function addEntry(entry) {
    chatHistory = chatHistory.concat(entry)
  }

  function getChatHistory() {
    return chatHistory.slice()
  }

  function addUser(member, client) {
    members[member.userid] = member;
    sockets[member.userid] = client;
    indexedUsers.push(member.userid);
    console.log('mem', members);
  }

  function broadcastStart(cards) {
    var res = new Array(parseInt(num));
    let count = 0;
    for (let j = 0; j < 52; j++) {
      if(count === parseInt(num)) {
        count = 0;
      }
      if(!res[count]) {
        res[count] = [];
      }
      res[count].push(cards[j]);
      count++;
    }
    let i =0;
    let starter;
    setTimeout(() => {
      for(const t in sockets){ 
        if( res[i].indexOf("sA") !==-1 ) {
          starter = t;
          console.log('starter at star', starter);
        }
          
        sockets[t].emit('startingCards', res[i]);
        i += 1;
      }
      for(const t in sockets){ 
        sockets[t].emit('starter', starter);
      }
    }, 600);
    console.log('starter at end', starter);
  }

  function broadcastCardDropped(cardObj) {
    const playerIndex = indexedUsers.indexOf(cardObj.userid);
    let nextPlayer, action;
    if(currentRoundCards.suite) {
      currentRoundCards.cards.push({userid: cardObj.userid, card: cardObj.card});
      //If not pettu
      if(cardObj.card[0] === currentRoundCards.suite) {
        //close round
        if(currentRoundCards.cards.length === indexedUsers.length) {
          nextPlayer = currentRoundCards.cards.reduce((prevC, nextC) => {
            return cardVals.indexOf(prevC.card[1])  > cardVals.indexOf(nextC.card[1]) ? prevC : nextC;
          }).userid;
          action = "closeRound";
          delete currentRoundCards['suite'];
          //console.log('curr',currentRoundCards);
        }
        //continue round
        else {
          nextPlayer = indexedUsers[playerIndex+1];
          if(playerIndex === indexedUsers.length - 1) {
            nextPlayer = indexedUsers[0];
          }
          action = "continueRound";
        }
      }
      else {
        //if pettu
        currentRoundCards.cards.pop();
        nextPlayer = currentRoundCards.cards.reduce((prevC, nextC) => {
          return cardVals[prevC.card[1]] > cardVals[nextC.card[1]] ? prevC : nextC;
        }).userid;
        action = "pettu";
        delete currentRoundCards['suite'];
      }
    }
    else {
      currentRoundCards['suite'] = cardObj.card[0];
      currentRoundCards['cards'] = [{userid: cardObj.userid, card: cardObj.card}];
      nextPlayer = indexedUsers[playerIndex+1];
      if(playerIndex === indexedUsers.length - 1) {
        nextPlayer = indexedUsers[0];
      }
      action = "continueRound";
    }
    const dropObj = {card: cardObj.card, userid: cardObj.userid, action, nextPlayer };
    for(const t in sockets){ 
      sockets[t].emit('droppedCard', dropObj);
    }
  }

  function broadcastFinished(user) {
    finishers.push(user.userid);
    const finishObj = {userid: user.userid, place: finishers.length};
    if(user.nextPlayerEmptyHand) {
      currentRoundCards = currentRoundCards.filter((c) => {
        return c.userid !== user.userid;
      });
      nextPlayer = currentRoundCards.cards.reduce((prevC, nextC) => {
        return cardVals.indexOf(prevC.card[1])  > cardVals.indexOf(nextC.card[1]) ? prevC : nextC;
      }).userid;
    finishObj["nextPlayer"] = nextPlayer;
    }
    indexedUsers.splice(indexedUsers.indexOf(user.userid), 1);
    if(indexedUsers.length ===  1) {
      finishObj['gameOver'] = true;
      finishObj["loserid"] = indexedUsers[0];
    }
    for(const t in sockets){ 
      sockets[t].emit('someoneFinished', finishObj);
    }
  }

  function removeUser(client) {
    members.delete(client.id)
  }

  function getRoomDetails() {
    return {roomName, roomId, members};
  }

  function serialize() {
    return {
      name,
      image,
      numMembers: members.size
    }
  }

  return {
    broadcastJoined,
    addEntry,
    getChatHistory,
    addUser,
    removeUser,
    serialize,
    getRoomDetails,
    broadcastStart,
    broadcastCardDropped,
    broadcastFinished,
  }
}
