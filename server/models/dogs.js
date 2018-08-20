var mongoose = require('mongoose');
var dogSchema = new mongoose.Schema({
    'name': String,
    'sex': String
});
module.exports = mongoose.model('Dog',dogSchema);