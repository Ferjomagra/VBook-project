var mongoose = require('mongoose')
var Schema = mongoose.Schema

//mongoose.connect('mongodb://virtbook:12345@ds113775.mlab.com:13775/heroku_kn1bzxrl')

var text_schema = new Schema({

	title : {type : String, required: true},
	text : {type: String, require: true},
	creator: {type: Schema.Types.ObjectId, ref: 'vbook'}
	
});
var Note = mongoose.model('Note', text_schema)
module.exports = Note
