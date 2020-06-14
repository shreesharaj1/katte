import Chatroom from './Chatroom';  
  
function roomList() {
    let activeRoomList = {};

    function getActiveRoomList() {
      return activeRoomList;
    }

    function addRoom(room, client) {
      activeRoomList[room.id] = Chatroom(room, client);
    }
    
    function removeRoom() {
      delete activeRoomList[room.id];
    }
    
    function getRoom(roomid) {
      // console.log('aa',activeRoomList)
      // console.log('bb',room);
      // console.log('cc', activeRoomList[room.id]);
      return activeRoomList[roomid];
    }

    return {
      getRoom: function(roomid){ return getRoom(roomid) },
      addRoom: function(room, client){ return addRoom(room, client) },
      removeRoom: function(room){ return removeRoom(room) },
      getRoomList: function(room){ return getActiveRoomList(room) }
    }
  }

  const roomListObj = roomList();

module.exports = function (client) {

  function handleCreateRoom(gameRoom, callback) {

    roomListObj.addRoom(gameRoom, client);

    callback(null, ['some array'])
  }

  function handleJoinRoom(room, callback) {

    const r = roomListObj.getRoom(room.id);
    r.addUser(room.user, client);
    r.broadcastJoined(room.user);
    callback(null, r.getRoomDetails());
  }

  
  function handleCardDrop(cardObj, callback) {

    const r = roomListObj.getRoom(cardObj.room);
    r.broadcastCardDropped(cardObj);
    callback(null, null);
  }
  
  function handleStartGame(room, callback) {

    const r = roomListObj.getRoom(room.id);
    
    const names = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
	  const suits = ['s'];//,'h','c','d'];
	  let cards = [];
    
    for( let s = 0; s < suits.length; s++ ) {
        for( let n = 0; n < names.length; n++ ) {
            cards.push( suits[s]+names[n]);
        }
    }

    let currentIndex = cards.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = cards[currentIndex];
      cards[currentIndex] = cards[randomIndex];
      cards[randomIndex] = temporaryValue;
    }

    r.broadcastStart(cards);
    callback(null, r.getRoomDetails());
  }

  function iFinished(user, callback) {

    const r = roomListObj.getRoom(user.room);
    r.broadcastFinished(user);
    callback(null, null);
  }

  function handleLeave(chatroomName, callback) {
    const createEntry = () => ({ event: `left ${chatroomName}` })
  }

  function handleMessage({ chatroomName, message } = {}, callback) {
    const createEntry = () => ({ message })
  }

  function handleGetChatrooms(_, callback) {
    return callback(null, chatroomManager.serializeChatrooms())
  }

  function handleGetAvailableUsers(_, callback) {
    return callback(null, clientManager.getAvailableUsers())
  }

  function handleDisconnect() {
    // remove user profile
    console.log('dd');
    
  }

  return {
    handleCreateRoom,
    handleJoinRoom,
    handleStartGame,
    handleCardDrop,
    handleDisconnect,
    iFinished,
  }
}