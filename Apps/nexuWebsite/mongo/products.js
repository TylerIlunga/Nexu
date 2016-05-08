var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var products = new Schema({
	amount: Number
});

var user = mongoose.model('user', userSchema);
var stock = mongoose.model('stock', stockSchema);
var limit = mongoose.model('limit', purchaseLimitSchema);

module.exports = mongoose.model('shoeData', new Schema({ 
    shoe: String, 
    shoeSize: String, 
    email: String,
    number: Number,
    address: String
}));
