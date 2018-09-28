const mongoose = require('../node_modules/mongoose');

const rightSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        //unique: true
    },
    description: String
});

const Right = mongoose.model('Right',rightSchema,{ collection: 'rights' });

exports.rightSchema = rightSchema;
exports.Right = Right;