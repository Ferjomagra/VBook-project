var Note = require('../models/note')

module.exports = function(req,res,next){
	Note.findById(req.params.id)
		.populate('creator')
		.exec(function(err,notacion){
			if(notacion != null){
				
				res.locals.notacion = notacion
				next()
			} else {
				res.redirect('/app')
			}
		})
}