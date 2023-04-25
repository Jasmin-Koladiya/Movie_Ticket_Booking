var mongoose = require('mongoose');
var multer = require('multer');
var path = require('path');
var mallSchema = mongoose.Schema({
    MallName: {
        type: String,
        required: true
    }
    
});
var Mall = mongoose.model('Mall', mallSchema);
module.exports = Mall;