var mongoose = require('mongoose');
var multer = require('multer');
var path = require('path');
var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role : {
        type: String,
        required : true
    }
    
});
var User = mongoose.model('User', userSchema);
module.exports = User;