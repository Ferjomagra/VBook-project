var express = require('express');
var path = require('path');
var fs = require('fs')
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
var formidable = require('express-formidable')
var vbook = require('./models/vbookuser').vbook
var parse = require('parse')
var multipart = require('connect-multiparty')

/*var routes = require('./routes/routes');*/

var mongoose = require('mongoose')
    mongoose.connect('mongodb://localhost/vbook') 
    /*mongoose.connect('mongodb://vbook:1234@ds121345.mlab.com:21345/heroku_z5p04jcw')*/

var router_app = require('./routes_app')
var session_middleware = require('./middlewares/session')


var methodOverride = require('method-override')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));



/*ADD*/
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));



/*Para editar*/
app.use(methodOverride('_method'))
/*Fin de para editar*/

//app.use(formidable.parse({ keepExtensions: true }))






app.use(session({
  secret: '1234fernando',
  resave: false,
  saveUninitialized: false
}))




app.set('view engine', 'jade');
/*app.use('/', routes)*/

/*ADD*/
app.get('/', function(req,res){
  res.render('start')
})
app.get('/Vbook-signup', function(req,res){
  vbook.find(function(err,doc){
    console.log(doc)
    res.render('vbook/signup')
  })
})

app.get('/Vbook-signin', function(req,res){
  res.render('vbook/signin')
})

app.post('/users', function(req, res){

  var user = new vbook({
    comp_name: req.body.comp_name, 
    comp_email: req.body.comp_email,
    comp_pass: req.body.comp_pass,
    reap_pass: req.body.reap_pass
  })


  user.save().then(function(us){
    res.redirect('/Vbook-signin')
    }, function(err){
      console.log(String(err))
      res.redirect('/Vbook-signup')
  })
})




app.get('/app/profile', function(req,res){
  res.render('app/profile')
})



app.get(function(req,res){

})
app.put(function(req,res){

})


//INICIO DE EDITAR PERFIL

//FIN DE EDITAR PERFIL

app.post('/sessions', function(req, res){
  vbook.findOne({comp_email: req.body.comp_email, comp_pass: req.body.comp_pass}, 
    function(err, user){
    
      req.session.user_id = user._id
      console.log(user)
      res.redirect('/app')
      
    })
})


app.use('/app', session_middleware)
app.use('/app', router_app)

/*FIN DE ADD*/











// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
