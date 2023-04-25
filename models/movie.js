var mongoose = require('mongoose');
var path = require('path');
var multer = require('multer');
var AVATAR_PATH = ('/uploads/movie');
var movieSchema = mongoose.Schema({
    MovieName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
     isactive: {
        type: Number,
        required: true
    }
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", AVATAR_PATH));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now());
    }
});

movieSchema.statics.uploadAvatar = multer({
    storage: storage
}).single('avatar');

movieSchema.statics.avatarpath = AVATAR_PATH;

var Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;