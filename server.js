const express = require('./node_modules/express');
const userService = require('./users/userService');
const userRightService = require('./users/userRightService');

const Joi = require('./node_modules/joi');
const mongoose = require('./node_modules/mongoose');

//const Session = require('./users/session');

const server = express();

server.use(express.json());
server.use('/api/users', userService);
server.use('/api/userRights', userRightService);

mongoose.connect('mongodb://localhost/fitness')
    .then(() => console.log('connected to mongodb/fitness Database'))
    .catch(err => console.log('Could not connect to mongodb', err));


server.get('/', (req, res) => res.send('<script> window.location.replace("http://stackoverflow.com");</script>'));

server.listen(3000, ()  => console.log('Server listening on port 3000!'));

//exports.Sessin = Session;