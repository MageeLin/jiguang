var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// 直接从mongooseConfig.js中引入配置，提前打开数据库，不必到每个router中打开数据库
require('./config/mongooseConfig');
// 引入路由规则，路由规则中已经提前引入了models
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dogsRouter = require('./routes/dogs');
var homepagesRouter = require('./routes/homepages');
var footersRouter = require('./routes/footers');
var messageboardsRouter = require('./routes/messageboards');
var filesRouter = require('./routes/files');
var systemsRouter = require('./routes/systems');
var articlesRouter = require('./routes/articles');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 登录拦截
app.use(function (req, res, next) {
  // var weappReg = /\/weapp\//;
  if (req.cookies.id) {
    next();
  } else if (/\/weapp\//.test(req.path)) {
    // 先暂且这样，所有的weapp接口都不用验证
    next();
  } else {
    if (req.path == '/homepages/get' || req.path == '/footers/get' || req.path == '/users/getbylogin' || req.path == '/users/reg' || req.path == '/users/weapp/getbylogin' || req.path == '/files/weapp/uploadslider' || req.path == '/users/getstudentinfo' || req.path == '/articles/getarticleinfo') {
      next();
    } else {
      res.json({
        status: '1',
        msg: '当前未登录',
        result: ''
      });
    }
  }
});

// 给不同的路由应用不同的路由规则
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dogs', dogsRouter);
app.use('/homepages', homepagesRouter);
app.use('/footers', footersRouter);
app.use('/messageboards', messageboardsRouter);
app.use('/files', filesRouter);
app.use('/systems', systemsRouter);
app.use('/articles', articlesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;