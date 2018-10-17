const mongoose = require('../node_modules/mongoose');
//const Joi = require('../node_modules/joi');
const {stateSchema} = require('../users/state');
//const {rightSchema} = require('./right');
const {userSchema} = require('../users/user');
const {Session} = require('../users/session');

async function addUserRight(req, res, next){
	let session = await Session.findById(req.get('sessionId'));

	if(session.user.rights.length<1){
		return res.status(401).send('Current user daes not have right to add new user');		
	}

	let right; 
	session.user.rights.forEach(userRight => {
		if(userRight.name === 'addUser') right = userRight;
	});

	if(!right){
		res.status(401).send('Current user does not have right to add new user');
	}else {
		next();
	}
}

async function getRightsRight(req, res, next){
	let session = await Session.findById(req.get('sessionId'));

	if(session.user.rights.length<1){
		return res.status(401).send('Current user daes not have right to add new user');		
	}

	let right; 
	session.user.rights.forEach(userRight => {
		if(userRight.name === 'getRights') right = userRight;
	});

	if(!right){
		res.status(401).send('Current user does not have getRights right');
	}else {
		next();
	}
}

async function getUsersRight(req, res, next){
	let session = await Session.findById(req.get('sessionId'));

	if(session.user.rights.length<1){
		return res.status(401).send('Current user daes not have right to add new user');		
	}

	let right; 
	session.user.rights.forEach(userRight => {
		if(userRight.name === 'getUsers') right = userRight;
	});

	if(!right){
		res.status(401).send('Current user does not have right to get Users');
	}else {
		next();
	}
}

async function getUserRight(req, res, next){
	let session = await Session.findById(req.get('sessionId'));

	if(session.user.rights.length<1){
		return res.status(401).send('Current User does not have getUser right');		
	}

	let right; 
	session.user.rights.forEach(userRight => {
		if(userRight.name === 'getUser') right = userRight;
	});

	if(!right){
		res.status(401).send('Current User does not have getUser right');
	}else {
		next();
	}
}

async function deleteUserRight(req, res, next){
	let session = await Session.findById(req.get('sessionId'));

	if(session.user.rights.length<1){
		return res.status(401).send('Current user daes not have right to delete user');		
	}

	let right; 
	session.user.rights.forEach(userRight => {
		if(userRight.name === 'deleteUser') right = userRight;
	});

	if(!right){
		res.status(401).send('Current user daes not have right to delete user');
	}else {
		next();
	}
}

async function activateUserRight(req, res, next){
	let session = await Session.findById(req.get('sessionId'));

	if(session.user.rights.length<1){
		return res.status(401).send('Current user daes not have right to activate user');		
	}

	let right; 
	session.user.rights.forEach(userRight => {
		if(userRight.name === 'activateUser') right = userRight;
	});

	if(!right){
		res.status(401).send('Current user daes not have right to activate user');
	}else {
		next();
	}
}

async function updateUserRight(req, res, next){
	let session = await Session.findById(req.get('sessionId'));

	if(session.user.rights.length<1){
		return res.status(401).send('Current user daes not have right to add new user');		
	}

	let right; 
	session.user.rights.forEach(userRight => {
		if(userRight.name === 'updateUser') right = userRight;
	});

	if(!right){
		res.status(401).send('Current user daes not have right to add new user');
	}else {
		next();
	}
}

async function addRightsToUserRight(req, res, next){
	let session = await Session.findById(req.get('sessionId'));

	if(session.user.rights.length<1){
		return res.status(401).send('Current user daes not have right to add new user');		
	}

	let right; 
	session.user.rights.forEach(userRight => {
		if(userRight.name === 'addRightsToUser') right = userRight;
	});

	if(!right){
		res.status(401).send('Current user daes not have right to add new user');
	}else {
		next();
	}
}

async function deleteRightFromUserRight(req, res, next){
	let session = await Session.findById(req.get('sessionId'));

	if(session.user.rights.length<1){
		return res.status(401).send('Current user daes not have right to add new user');		
	}

	let right; 
	session.user.rights.forEach(userRight => {
		if(userRight.name === 'deleteRightFromUser') right = userRight;
	});

	if(!right){
		res.status(401).send('Current user daes not have right to add new user');
	}else {
		next();
	}
}

async function updateUserRightsRight(req, res, next){
	let session = await Session.findById(req.get('sessionId'));

	if(session.user.rights.length<1){
		return res.status(401).send('Current user daes not have right to update users rights');		
	}

	let right; 
	session.user.rights.forEach(userRight => {
		if(userRight.name === 'updateUserRights') right = userRight;
	});

	if(!right){
		res.status(401).send('Current user daes not have right to update users rights');
	}else {
		next();
	}
}

async function resetPasswordRight(req, res, next){
	let session = await Session.findById(req.get('sessionId'));

	if(session.user.rights.length<1){
		return res.status(401).send('Current user daes not have right to update users rights');		
	}

	let right; 
	session.user.rights.forEach(userRight => {
		if(userRight.name === 'resetPassword') right = userRight;
	});

	if(!right){
		res.status(401).send('Current user daes not have right to update users rights');
	}else {
		next();
	}
}

async function changePasswordRight(req, res, next){
	let session = await Session.findById(req.get('sessionId'));

	if(session.user.rights.length<1){
		return res.status(401).send('Current user daes not have right to update users rights');		
	}

	let right; 
	session.user.rights.forEach(userRight => {
		if(userRight.name === 'changePassword') right = userRight;
	});

	if(!right){
		res.status(401).send('Current user daes not have right to update users rights');
	}else {
		next();
	}
}

exports.addUserRight = addUserRight;
exports.getUsersRight = getUsersRight;
exports.getUserRight = getUserRight;
exports.deleteUserRight = deleteUserRight;
exports.updateUserRight = updateUserRight;
exports.getRightsRight = getRightsRight;
exports.addRightsToUserRight = addRightsToUserRight;
exports.deleteRightFromUserRight = deleteRightFromUserRight;
exports.updateUserRightsRight = updateUserRightsRight;
exports.resetPasswordRight = resetPasswordRight;
exports.changePasswordRight = changePasswordRight;
exports.activateUserRight = activateUserRight;