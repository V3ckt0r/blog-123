var express = require('express');
var cookies = require('./lib/fortune.js');
var morgan = require('morgan');

var app = express();

//sets up morgan - the http logger with Apache combined format to STDOUT
app.use(morgan('combined'));

//set up handlebars view engine
var handlebars = require('express3-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://locahost:' + app.get('port') + '; press ctrl-C to terminate.' );
});

//initialise static middleware
app.use(express.static(__dirname + '/public'));

//initialise test middleware
app.use(function(req, res, next){
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
next();
});

//root page
app.get('/', function(req,res){
  res.render('home'); 
});

//about page
app.get('/about', function(req, res){
  res.render('about', { fortune: cookies.getFortune(),
			pageTestScript: '/qa/tests-about.js' });
});

//contact page
app.get('/contact', function(req, res){
  res.render('contact');
});

//Bee's test
app.get('/index', function(req, res){
  res.render('index',{ layout: null});
});

app.get('/tours/hood-river', function(req, res){
  res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function(req, res){
 res.render('tours/request-group-rate');
});

// 404 error page
app.use(function(req, res, next){
  res.status(404);
  res.render('404');
});

//500 server error
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});
