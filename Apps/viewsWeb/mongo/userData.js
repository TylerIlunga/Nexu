var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var userData = mongoose.model('userData', new Schema({
	name: String,
	email: String,
	number: Number
}));

module.exports = userData;