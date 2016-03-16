var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;

mongoose.connect('mongodb://tylerilunga1:cougarsc7@ds011399.mlab.com:11399/iosdata');

app.use('/', function(req, res, next){
	console.log('Requested URL: ' + req.url);
	//run the next middleware
	next();
})
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
	brand: String,
	amount: Number
});

var purchaseLimitSchema = new Schema({
	amount: Number
});

var user = mongoose.model('user', userSchema);
var stock = mongoose.model('stock', stockSchema);
var limit = mongoose.model('limit', purchaseLimitSchema);


//socket.io
var http = require('http').Server(app);
var io = require('socket.io')(http);
io.on('connection', function(socket) {
	socket.on('connect', function() { 
   		 console.log('connected');
 });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });

    socket.on('stock init', function(data) {
        console.log('stock init called!');
        var yeezy = stock({
			brand: "Addias",
			amount: 5
		});

		yeezy.save(function(err){
			if (err) throw err

			console.log("item saved!");
		});
        stock.find({}).limit(100).exec(function(err, data){
            socket.emit('stock init', data);
        });
    });

    socket.on('stock stored', function(data) {
        console.log('Stock stored!');

		
    });
});

http.listen(port,"192.168.0.102", function(err){
	if (err) throw err 

	console.log("listening on 192.168.0.102:" + port);
});
//web connection
// 192.168.0.255
// var apiController = require('./controllers/apiController');
// var htmlController = require('./controllers/htmlController');

// var port = process.env.PORT || 3000;

// app.use('/assets', express.static(__dirname + '/public'));

// app.set('view engine', 'ejs');

// app.use('/', function (req, res, next) {
// 	console.log('Request Url:' + req.url);
	
// 	// get all the users
// 	user.find({}, function(err, users) {
// 		if (err) throw err;
		
// 		// object of all the users
// 		console.log(users);
// 	});
	
// 	next();
// });

// htmlController(app);

// apiController(app);



