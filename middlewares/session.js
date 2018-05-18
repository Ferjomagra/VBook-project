var vbook = require('../models/vbookuser').vbook

module.exports =  function(req, res, next){
	if(!req.session.user_id){
		res.redirect('/Vbook-signin')
	}
	else{
		vbook.findById(req.session.user_id, function(err, user){
			if(err){
				console.log(err)
				res.redirect('/Vbook-signin')
			} else{
				res.locals = {user: user}
				next()
			}

		})
		

	}
}