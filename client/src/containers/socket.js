const io = require('socket.io-client')


export default function () {
  const socket = io.connect('http://localhost:8080', { pingTimeout: 1200000});

  function registerHandler(onMessageReceived) {
    socket.on('joined', onMessageReceived);
  }

  function unregisterHandler() {
    socket.off('message')
  }

  socket.on('error', function (err) {
    console.log('received socket error:')
    console.log(err)
  })

  function register(name, cb) {
    socket.emit('register', name, cb)
  }

  function createRoom(chatroomName, cb) {
    socket.emit('createRoom', chatroomName, cb)
  }

  function joinRoom(chatroomName, cb) {
    socket.emit('joinRoom', chatroomName, cb)
  }
  
  function startGame(chatroomName, cb) {
    socket.emit('startGame', chatroomName, cb)
  }
  
  function dropCard(cardObj, cb) {
    socket.emit('dropCard', cardObj, cb)
  }
  
  function registerDroppedCard(cb) {
    socket.on('droppedCard', cb)
  }

  function iFinished(user, cb) {
    socket.emit('iFinished', user, cb)
  }
  
  function someOneFinished(cb) {
    socket.on('someoneFinished', cb)
  }
  
  function registerStartingCards(cb) {
    socket.on('startingCards', cb)
  }
  
  function registerStarter(cb) {
    socket.on('starter', cb)
  }

  function leave(chatroomName, cb) {
    socket.emit('leave', chatroomName, cb)
  }

  function message(chatroomName, msg, cb) {
    socket.emit('message', { chatroomName, message: msg }, cb)
  }

  function getChatrooms(cb) {
    socket.emit('chatrooms', null, cb)
  }

  function getAvailableUsers(cb) {
    socket.emit('availableUsers', null, cb)
  }

  return {
    register,
    createRoom,
    joinRoom,
    startGame,
    registerStartingCards,
    registerStarter,
    leave,
    message,
    getChatrooms,
    getAvailableUsers,
    registerHandler,
    unregisterHandler,
    dropCard,
    registerDroppedCard,
    iFinished,
    someOneFinished,
  }
}

