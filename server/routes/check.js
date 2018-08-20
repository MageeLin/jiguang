// 本文件为读取数据的接口
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// 引入models中的model实例
var Homepages = require('../models/homepages');
var Users = require('../models/users');
var Messageboards = require('../models/messageboards');

// //数据库的初始化设置，连接方式和事件 
// mongoose.connect('mongodb://127.0.0.1:27017/jiguang');
// var db = mongoose.connection;

// db.on('connected', function () {
//     console.log('MongoDB数据库已连接');
// });
// db.on('err', function (err) {
//     console.log('MongoDB数据库报错，错误信息为：' + err);
// });
// db.on('disconnected', function () {
//     console.log('与MongoDB数据库断开连接');
// });



// 路由规则start

// 读取主页内容
router.get('/homepage',function(req, res, next){
    Homepages.findOne({},function(err,doc){
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            });
        } else {
            res.json({
                status: '0',
                msg: 'suc',
                result: doc
            });
            
        }
    });
});



// 路由规则end

module.exports = router;
