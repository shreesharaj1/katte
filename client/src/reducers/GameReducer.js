const initialState = {username: '', userid:"", roomNumber:'', existingUsers: 0};

function GameReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        username: action.payload.user.username,
        userid: action.payload.user._id,
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        loginError: true,
      };
    case 'CREATE_ROOM_SUCCESS':
      return {
        ...state,
        roomNumber: action.payload.room.room_id,
        numOfPlayers: action.payload.room.num_of_players,
        creator: true,
      };
    case 'JOIN_ROOM_SUCCESS':
      let lastJoinee = false;
      if(Object.keys(state.existingUsers).length === parseInt(action.payload.room.num_of_players)) {
        lastJoinee = true;
      }
      return {
        ...state,
        roomNumber: action.payload.room.room_id,
        numOfPlayers: action.payload.room.num_of_players,
        joinedRoom: true,
        lastJoinee,
      };
    case 'EXISTING_USERS':
      return {
        ...state,
        existingUsers: action.payload.members
      };
    case 'SOCKET':
      return {
        ...state,
        socket: action.payload,
      };
    default:
      return { state };
  }
}

export default GameReducer;