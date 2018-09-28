const mongoose = require('../node_modules/mongoose');
//const Joi = require('../node_modules/joi');
const {stateSchema} = require('./state');
//const {rightSchema} = require('./right');
const {userSchema} = require('./user');

// User Schema from Database
const sessionSchema = new mongoose.Schema({    
	user: userSchema,
	startDate: {
		type: Date,
		default: Date.now
	},
	endDate: {
		type: Date,
		default: Date.now() + 4*3600*1000	// add 4 hours
	},
    state: {
        type: stateSchema
    }
});

/*** 1. Validate sessionId  */

//Session Class from Schema
const Session = mongoose.model('Session', sessionSchema,{ collection: 'sessions' });

exports.Session = Session;
exports.sessionSchema = sessionSchema;
