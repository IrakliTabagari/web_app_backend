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
server.use('/api/users', userService);
server.use('/api/userRights', userRightService);
server.use('/api/db', createDBService);
server.get('/', (req, res) => res.send('<script> window.location.replace("http://stackoverflow.com");</script>'));
server.use(error);

mongoose.connect('mongodb://localhost/appdb')
    .then(() => console.log('connected to mongodb/appdb Database'))
    .catch(err => console.log('Could not connect to mongodb', err));


server.listen(3000, ()  => console.log('Server listening on port 3000!'));

//exports.Sessin = Session;