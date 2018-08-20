// 作品集内容页数据骨架模型
var mongoose = require('mongoose');
var contextSchema = new mongoose.Schema({
    'headTitle': {type: String},
    'title': {type: String},
    'time': {type: Date, default: Date.now},
    'content': {type: String},
    
});
module.exports = mongoose.model('context', contextSchema);