// 留言板数据骨架模型
var mongoose = require('mongoose');
var messageboardSchema = new mongoose.Schema({
    'creatorId': mongoose.Schema.Types.ObjectId,
    'creatorName': {
        type: String
    },
    'avatar': {
        type: String
    },
    'time': {
        type: Date,
        default: Date.now
    },
    'content': {
        type: String
    },
    'reply': [{
        'name': {
            type: String
        },
        'avatar': {
            type: String
        },
        'time': {
            type: Date,
            default: Date.now
        },
        'content': {
            type: String
        },
        'time': {
            type: Date,
            default: Date.now
        }
    }]
});
module.exports = mongoose.model('messageboard', messageboardSchema);