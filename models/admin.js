var mongoose = require('mongoose');
var multer = require('multer');
var path = require('path');
var adminSchema = mongoose.Schema({
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
        type : String,
        required : true
    }
});
var Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;