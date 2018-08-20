// footer骨架模型
var mongoose = require('mongoose');
var footerSchema = new mongoose.Schema({
    copyright: {
        type: String
    },
    recordNumber: {
        type: String
    }
});
module.exports = mongoose.model('footer', footerSchema);