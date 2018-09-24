const mongoose = require('../node_modules/mongoose');
const Joi = require('../node_modules/joi');
const {stateSchema} = require('./state');
const {rightSchema} = require('./right');

// User Schema from Database
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 120,
        //unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
    email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255
    },
    state: {
        type: stateSchema
    },
    rights:[{
        type: rightSchema    
    }]
});

function validateUser(user){
    const schema = {
        userName: Joi.string().min(5).max(120).required(),
        password: Joi.string().min(6).max(1024).required(),
        email: Joi.string().min(6).max(255).required().email()
    };

    return Joi.validate(user, schema);
}

//User Class from Schema
const User = mongoose.model('User',userSchema);

exports.User = User;
exports.userSchema = userSchema;
exports.validateUser = validateUser;