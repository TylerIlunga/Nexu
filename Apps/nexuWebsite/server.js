var express = require('express')
	, app = express()
	, port = process.env.PORT || 5000
	, morgan = require('morgan')
	, bodyParser = require('body-parser')
	, ejs = require('ejs')
	, bcrypt = require('bcryptjs')
	, mongoose = require('mongoose')
	, cookieParser = require('cookie-parser');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./mongo/config.js'); // get our config file
var Shoe   = require('./mongo/orderData.js'); // get our mongoose model

mongoose.connect(config.database, function(err){
	if (err) throw err;

	console.log("Connected to Database");
});



app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/mongo'));
app.use(express.static(__dirname + '/controllers'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.get('/', (req, res) => res.render('main.ejs'));
app.get('/order', (req, res) => res.render('order.ejs'));
app.get('/status', (req, res) => res.render('status.ejs'));
app.get('/products', (req, res) => res.render('products.ejs'));
app.get('/soon', (req, res) => res.render('soon.ejs'));
app.get('/buy', (req, res) => res.render('buy.ejs'));

app.get('/:page', (req, res) => {
	var page = req.params.page;
	res.send("Page Not Found, Sorry :(");
})

app.get('/api/token', (req, res) => {
	var token = req.query.tkn;
	if(!token)
		return res.json(404);

	// lookup token in mongo
	// return token info to user if exists
})

app.post('/api/order', (req, res) => {
	var body = req.body;
	// validate order
	// submit in mongo
		var shoeData = new Shoe({ 
	    shoe: req.body.shoe, 
	    shoeSize: req.body.shoeSize, 
	    email: req.body.email,
	    number: req.body.number,
	    address: req.body.address
  });

  // save the sample user
  shoeData.save(function(err) {
    if (err) throw err;


    console.log('shoe saved successfully');
    

  });



	// send email to tyler/yehuda for cofnrimation
	// when confirmed or denied- send to user later on
})

app.post('/api/deny/:token', (req, res) => {
	var token = req.params.token;

	// find token in mongo
	// set status to denied
	// email user about status change
})

app.post('/api/accept/:token', (req, res) => {
	var token = req.params.token;

	// find token in mongo
	// set status to awaiting purchase
	// email user about status change
})

app.post('/api/fail/:token', (req, res) => {
	var token = req.params.token;

	// find token in mongo
	// set status to failed
	// email user about status change
})

app.post('/api/success/:token', (req, res) => {
	var token = req.params.token;

	// find token in mongo
	// set status to success
	// email user about status change
	if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
     }
});


app.listen(port, () => console.log('yee'))