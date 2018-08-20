// 用户数据骨架模型
var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    "name": {type: String},
    "nickname": {
        type: String
    },
    "institute": {
        type: String
    },
    "major": {
        type: String
    },
    "department": {
        type: String
    },
    "enterSchool": {
        type: String
    },
    "leaveSchool": {
        type: String
    },
    "phone": {
        type: String
    },
    "email": {
        type: String
    },
    "password": {
        type: String
    },
    "avatar": {
        type: String
    },
    "isGuest": {
        type: Boolean
    },
    "isAdministrator": {
        type: Boolean
    },
    "promptNumber": {
        type: Number,
        default: 0
    }
});
module.exports = mongoose.model('user', userSchema);