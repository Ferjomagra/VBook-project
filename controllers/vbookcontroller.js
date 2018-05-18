var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')

module.exports = {

	start : function(req,res,next){
		res.render('start')
	},

	signup : function(req,res,next){
		res.render('vbook/signup')
	},
	
	signin : function(req,res,next){
		res.render('vbook/signin')
	},

}