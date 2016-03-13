var express = require('express');
var app = express();
var mongoose = require('mongoose');

mongoose.connect();

var Schema = mongoose.Schema;

var userSchema = new Schema({
	firstname: String,
	lastname: String,
	address: String
});

var releaseItemSchema= new Schema({
	brand: String,
	price: Number
});

var stockSchema = new Schema({
	amount: Number
});

var purchaseLimitSchema = new Schema({
	amount: Number
});

var user = mongoose.model('user', userSchema);
var stock = mongoose.model('stock', stockSchema);
var limit = mongoose.model('limit', purchaseLimitSchema);

var john = user({
  firstname: 'John',
  lastname: 'Doe',
  address: '555 Main St.'
});

// save the user
john.save(function(err) {
  if (err) throw err;

  console.log('person saved!');
});

var jane = user({
  firstname: 'Jane',
  lastname: 'Doe',
  address: '555 Main St.'
});

// save the user
jane.save(function(err) {
  if (err) throw err;

  console.log('person saved!');
});

var apiController = require('./controllers/apiController');
var htmlController = require('./controllers/htmlController');

var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use('/', function (req, res, next) {
	console.log('Request Url:' + req.url);
	
	// get all the users
	user.find({}, function(err, users) {
		if (err) throw err;
		
		// object of all the users
		console.log(users);
	});
	
	next();
});

htmlController(app);

apiController(app);

app.listen(port, function(err){
	if (err) throw err 

	console.log("listening on port " + port);
});