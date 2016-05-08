var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

module.exports = mongoose.model('shoeData', new Schema({ 
    shoe: String, 
    shoeSize: String, 
    email: String,
    number: Number,
    address: String
}));
