// server.js

// first we import our dependencies…
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import { getSecret } from './secrets';

const session = require('express-session')
const morgan = require('morgan')
const dbConnection = require('./database') 
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport');
// db config -- set your URI from mongo in secrets.js
console.log('haa',getSecret('dbUri'));
mongoose.connect(getSecret('dbUri')); 
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// and create our instances
const app = express();
const router = express.Router();

// set our port to either a predetermined port number if you have set it up, or 3001
const API_PORT = process.env.API_PORT || 3006;
// now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// Use our router configuration when we call /api
//app.use('/api', router);

// Route requires
const user = require('./routes/user')
// Sessions
app.use(
	session({
		secret: 'shreesh', //pick a random string to make the hash that is generated secure
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: true, //required
    saveUninitialized: false, //required
    cookie: {
      sameSite: false, // i think this is default to false
      maxAge: 60 * 60 * 1000 * 1000
    }
	})
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser

// Routes

function setupCORS(req, res, next) {
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-type,Accept,X-Access-Token,X-Key');
  res.header('Access-Control-Allow-Origin', 'http://localhost:3005');
  res.header('Access-Control-Allow-Credentials', 'true');
  // if (req.method === 'OPTIONS') {
  //     res.status(200).end();
  // } else {
      next();
  // }
}
app.all('/*', setupCORS);

app.use('/user', user)

// Starting Server 
app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));


const server = require('http').Server(app)
const io = require('socket.io')(server)

const ClientManager = require('./ClientManager')
const ChatroomManager = require('./ChatroomManager')
const makeHandlers = require('./handlers')

const clientManager = ClientManager()
const chatroomManager = ChatroomManager()

io.on('connection', function (client) {
  const {
    handleRegister,
    handleJoin,
    handleLeave,
    handleMessage,
    handleGetChatrooms,
    handleGetAvailableUsers,
    handleDisconnect
  } = makeHandlers(client, clientManager, chatroomManager)

  console.log('client connected...', client.id)
  clientManager.addClient(client)

  client.on('register', handleRegister)

  client.on('join', handleJoin)

  client.on('leave', handleLeave)

  client.on('message', handleMessage)

  client.on('availableUsers', handleGetAvailableUsers)

  client.on('disconnect', function () {
    console.log('client disconnect...', client.id)
    handleDisconnect()
  })

  client.on('error', function (err) {
    console.log('received error from client:', client.id)
    console.log(err)
  })
})

