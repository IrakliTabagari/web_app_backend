const express = require('./node_modules/express');
const userService = require('./users/userService');
const userRightService = require('./users/userRightService');
const createDBService = require('./users/createDBService');
const error = require('./middleware/error');

const Joi = require('./node_modules/joi');
const mongoose = require('./node_modules/mongoose');

//const Session = require('./users/session');

const server = express();

server.use(express.json());
server.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers",'sessionId,userName,Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
server.use('/api/users', userService);
server.use('/api/userRights', userRightService);
server.use('/api/db', createDBService);
server.get('/', (req, res) => res.send('<script> window.location.replace("http://localhost:4200/'));
server.use(error);

mongoose.connect('mongodb://localhost/appdb')
    .then(() => console.log('connected to mongodb/appdb Database'))
    .catch(err => console.log('Could not connect to mongodb', err));


server.listen(3000, ()  => console.log('Server listening on port 3000!'));  //3000

//exports.Sessin = Session;