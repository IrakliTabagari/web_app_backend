const mongoose = require('../node_modules/mongoose');
//const Joi = require('../node_modules/joi');
//const {stateSchema} = require('../users/state');
//const {rightSchema} = require('./right');
//const {userSchema} = require('../users/user');
const { Session } = require('../users/session');

async function checkSession(req, res, next){
	/*** 1. Validate sessionId  */

	let session = await Session.findById(req.get('sessionId'));
	let headerUserName = req.get('userName');
	
	if(!session || !headerUserName || session.user.userName!==headerUserName) res.status(401).send('Not Authorised');

	let now = new Date();

	if(now > session.startDate
			&& now < session.endDate
			&& session.state.name === "Active"){
		next();	
	}else{
		res.status(401).send('Session Timed Out');
	}
}

module.exports = checkSession;