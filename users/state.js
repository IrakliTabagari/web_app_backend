const mongoose = require('../node_modules/mongoose');

const stateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 120,
        //unique: true
    },
    description: String
});

const State = mongoose.model('State',stateSchema,{ collection: 'states' });

exports.stateSchema = stateSchema;
exports.State = State;