const mongoose = require('mongoose')
var schema = mongoose.Schema


//mongoose.connect('mongodb://virtbook:12345@ds113775.mlab.com:13775/heroku_kn1bzxrl')
//mongoose.connect('mongodb://localhost/vbook')

var email_match = [ /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i, 'Ingresa un email válido']


var password_validation = {
	validator: function(p){
  		return this.reap_pass == p
  	}, 
  	message: 'Las constraseñas no son iguales'
}


var schemalogin = new schema({
  comp_name: { type: String, required: true, maxlength:[50, 'Ingrese su nombre'] },
  comp_email: { type: String, required: 'Ingrese su correo electronico', match: email_match, unique: true },
  comp_pass: { type: String, minlength:[3,'La contraseña es muy corta'], validate: password_validation },
  /*reap_pass: { type: String, required: true },*/
  /*imagen: { type: String, default: 'default.jpg' },*/
  user_public: { type: String }
  /*registro: { type: Date, default: Date.now() }*/
})

schemalogin.virtual('reap_pass').get(function(){
	return this.p_c

}).set(function(comp_pass){
	this.p_c = comp_pass
})

var vbook = mongoose.model('vbook', schemalogin)
module.exports.vbook = vbook


/*tipos de datos
	String
	number
	date 
	buffer 
	boolean 
	mixed
	objected
	array
*/

