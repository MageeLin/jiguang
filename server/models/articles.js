// 作品集内容页数据骨架模型
var mongoose = require('mongoose');
var articleSchema = new mongoose.Schema({
    'url': {
        type: String
    },
    'title': {
        type: String
    },
    'content': [{
        'index': {
            type: String
        },
        'type': {
            type: String
        },
        'value': {
            type: String
        }
    }],

});
module.exports = mongoose.model('article', articleSchema);