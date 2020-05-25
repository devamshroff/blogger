var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var blogRouter = require('./routes/blog');
var loginRouter = require('./routes/login');
var apiRouter = require('./routes/api');
var app = express();


// set client
let client = require('./db');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// editor jwt check
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
app.get('/editor', function (req, res, next){
  // console.log("im here in this editor function");
  var jwt_token = req.cookies.jwt;
    if (!jwt_token){
        // console.log("A");
        return res.redirect('/login?redirect=/editor/'); //res.status(401).send('ERROR 401: Unauthorized Status Code, invalid JWT token');
    } else if (!jwt.verify(jwt_token,"C-UFRaksvPKhx1txJYFcut3QGxsafPmwCY6SCly3G6c")){
        // console.log("B");
        return res.redirect('/login?redirect=/editor/'); //res.status(401).send('ERROR 401: Unauthorized Status Code, invalid signature');
    }
    else if (jwt.decode(jwt_token).exp<=(Date.now()/1000)){
        // console.log("D");
        return res.redirect('/login?redirect=/editor/');// return res.status(401).send('ERROR 401: Unauthorized Status Code, past expiration');
    }
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/blog', blogRouter);
app.use('/login', loginRouter);
app.use('/api', apiRouter);


// connect to mongo on start
client.connect('mongodb://localhost:27017/', function (err) {
    if (err) {
        console.log('Unable to connect to Mongo.');
        process.exit(1);
    }// else {
    //     app.listen(3000, function () {
    //         console.log('Listening on port 3000...');
    //     });
    //}
});

// this was for test, remove laters
app.get('/list', function (req, res) {
  let collection = client.db('BlogServer').collection('Users');
  collection.find().toArray(function (err, docs) {
      // res.render('users', {BlogServer: docs});
      res.render('list_users', {users: docs})
  });
});

//

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
