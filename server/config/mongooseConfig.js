var mongoose = require('mongoose');
//数据库的初始化设置
var mongodbUrl = 'mongodb://127.0.0.1:27017/jiguang';
var mongodbOptions = {
    useNewUrlParser: true
};

mongoose.connect(mongodbUrl, mongodbOptions);

// 数据库连接事件
mongoose.connection.on('connected', function () {
    console.log('与'+ mongodbUrl +'数据库连接成功');
});
mongoose.connection.on('err', function (err) {
    console.log('MongoDB数据库报错，错误信息为：' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('与MongoDB数据库断开连接');
});
