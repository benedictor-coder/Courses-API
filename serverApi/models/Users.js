const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [ true, 'Please Provide First Name' ]

    },
    lastName: {
        type: String,
        required: [ true, 'Plese Provide Last Name' ]
    },
    age: {
        type: Number,
        required: [ true, 'Please Provide Your Age' ]
    }
});

module.exports = mongoose.model('User', UserSchema);