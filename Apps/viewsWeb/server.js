var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	ejs = require('ejs'),
	mongoose = require('mongoose'),
	morgan = require('morgan'),
	port = process.env.PORT || 3000;

var config = require("./mongo/config.js");
var Data = require("./mongo/userData.js");


mongoose.connect(config.database, (err) => {
	if (err) throw err;

	console.log('Connected to database')
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', (req, res) => res.render('main.ejs'));
app.get('/reserve', (req, res) => res.render('reserve.ejs'));
app.get('/thanks', (req, res) => res.render('thanks.ejs'));

app.get('/:page', (req, res) => {
	res.render('404.ejs');

});

app.post('/api/reserve', (req, res) => {
	var body = req.body;

	var userInfo = new Data({
		name: req.body.name,
		email: req.body.email,
		number: req.body.number
	});

	userInfo.save((err) => {
		if (err) throw err;

		console.log('user data saved');
	})
	res.redirect('/thanks');
});

app.listen(port, function(){
	console.log('running...')
});