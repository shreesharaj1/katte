//Connect to Mongo database
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

//your local database url
//27017 is the default mongoDB port
//const uri = 'mongodb://localhost/katte';
const uri = 'mongodb://app_user:app1password@ds131743.mlab.com:31743/katte';
var options = { 
    server: { 
      socketOptions: { 
        keepAlive: 300000, connectTimeoutMS: 30000 
      } 
    }, 
    replset: { 
      socketOptions: { 
        keepAlive: 300000, 
        connectTimeoutMS : 30000 
      } 
    } 
  };
mongoose.connect(uri).then(
    () => { 
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ 
        console.log('Connected to Mongo');
        
    },
    err => {
         /** handle initial connection error */ 
         console.log('error connecting to Mongo: ')
         console.log(err);
         
        }
  );


module.exports = mongoose.connection
