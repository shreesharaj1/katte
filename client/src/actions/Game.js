import axios from 'axios';

const getUser = c => (dispatch) => { 
    axios.get('api/user/').then(response => {
        console.log('Get user response: ')
        console.log(response.data);
        if (response.data.user) {
          //setLoggedIn(true);
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: response.data,
          });
          //setUsername(response.data.user.username);
        } else {
          console.log('Get user: no user');
          //setLoggedIn(false);
          //setUsername('');
        }
      })
  return true;
}

const login = (email, password) => (dispatch) => { //request to server to add a new username/password
  axios.post('api/user/login', {
    email,
    password
  })
    .then(response => {
      console.log(response)
      if (!response.data.error) {
        console.log('successful login');
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: response.data,
        });
      } else {
        console.log('something went wrong');
        dispatch({
          type: 'LOGIN_ERROR',
          payload: 'error',
        });
      }
    }).catch(error => {
      console.log('login error: ')
      console.log(error);
      dispatch({
        type: 'LOGIN_ERROR',
        payload: error,
      });
    });
  }

const createRoom = roomObj => (dispatch) => { 
    axios.put('api/room/createRoom/', roomObj).then(response => {
        console.log('Get create room response: ')
        console.log(response.data);
        if (response.data.room) {
          //setLoggedIn(true);
          dispatch({
            type: 'CREATE_ROOM_SUCCESS',
            payload: response.data,
          });
          //setUsername(response.data.user.username);
        } else {
          console.log('Get user: no user');
          //setLoggedIn(false);
          //setUsername('');
        }
      })
      .catch(e => {
          console.log(e);
      })
  return true;
}

const joinRoom = (roomObj, users) => (dispatch) => { 
    
  dispatch({
      type: 'EXISTING_USERS',
      payload: users,
    });

    axios.post('api/room/joinRoom/', roomObj).then(response => {
        console.log('Get create room response: ')
        console.log(response.data);
        

        if (response.data.room) {
          //setLoggedIn(true);
          dispatch({
            type: 'JOIN_ROOM_SUCCESS',
            payload: response.data,
          });
          //setUsername(response.data.user.username);
        } else {
          console.log('Get user: no user');
          //setLoggedIn(false);
          //setUsername('');
        }
      })
      .catch(e => {
          console.log(e);
      })
  return true;
}

const socketShare = soc => (dispatch) => { 
      dispatch({
        type: 'SOCKET',
        payload: soc,
      });
  return true;
}

export { getUser, login, createRoom, joinRoom, socketShare };