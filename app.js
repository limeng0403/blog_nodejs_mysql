var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var md5 = require('crypto-md5');
var session = require('express-session')
var mysql = require('./libs/dbConn');

var routes = require('./routes/index');
var users = require('./routes/users');
//登录
var login = require('./routes/login');
//注册
var register = require('./routes/register');
//初始化数据库
var install = require('./routes/install');
//个人中心
var myHome = require('./routes/myHome');
//博客首页
var blogHome = require('./routes/blogHome');
//保存博客
var saveBlog = require('./routes/saveBlog');
//退出
var logout = require('./routes/logout');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use(function (req, res, next) {
    var views = req.session.views;

    if (!views) {
        views = req.session.views = {}
    }

    next()
});

app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
app.use('/reg', register);
app.use('/install', install);
app.use('/my_home', myHome);
app.use('/blogHome', blogHome);
app.use('/saveBlog', saveBlog);
app.use('/logout', logout);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            title: 'ERROR',
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        title: 'ERROR',
        message: err.message,
        error: {}
    });
});

module.exports = app;

app.listen(8080);