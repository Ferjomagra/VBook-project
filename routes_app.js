var express = require('express')
var Note = require('./models/note')
var Imagen = require('./models/imagenes')
var Vbook = require('./models/vbookuser')
var find_image = require('./middlewares/find_image')
var find_notes = require('./middlewares/find_notes')

var router = express.Router()
var controllers = require('./controllers')

router.get('/', function(req, res){
	res.render('app/home')
}),

router.route('/addbook') 
	.get(function(req,res){
		res.render('app/addbook')
}),

router.route('/profile')
	.get(function(req,res){
		res.render('app/profile')
	})
router.route('/mystand')
	.get(function(req,res){
		res.render('app/standuser')
}),









//PUBLICACIONES DE IMAGEN DE USUARIO
router.get('/imagenes/new', function(req,res){
	res.render('app/imagenes/new')
})

router.all('/imagenes/:id*', find_image)


router.get('/imagenes/:id/edit', function(req,res){
	res.render('app/imagenes/edit')
})


router.route('/imagenes/:id')

	.get(function(req,res){
		res.render('app/imagenes/show')
	})

	.put(function(req,res){
		
		res.locals.imagen.title = req.body.title
		res.locals.imagen.save(function(err){
			if(!err){
				res.render('app/imagenes/show')
			}else{
				res.render('app/imagenes/'+req.params.id+'/edit')
			}
		})
	})

	.delete(function(req,res){
		Imagen.findOneAndRemove({ _id : req.params.id }, function(err){
			if(!err){
				res.redirect('/app/imagenes')
			} else {
				res.redirect('/app/imagenes/index'+req.params.id)
			}
		})
	})

router.route('/imagenes')
	.get(function(req, res){
		Imagen.find({creator: res.locals.user._id}, function(err, imagenes){
			if(err){res.redirect('/app'); return;}

			res.render('app/imagenes/index', {imagenes : imagenes})	
		
		})
	})
	.post(function(req, res){

		//console.log(res.locals.user._id)
		console.log(req.body.archivo)

		var data_img = {
			title : req.body.title,
			creator : res.locals.user._id
		}
		var imagen = new Imagen(data_img)

		imagen.save(function(err){
			if(!err){
				res.redirect('/app/imagenes/'+imagen._id)
			}
			else{
				console.log(imagen)
				res.render(err)
			}
		})
	})

//FIN DE PUBLICACIONES DE IMAGEN DE USUARIO








//ANOTACIONES DE USUARIO
//Editar publicaiones

router.all('/textnote/:id*', find_notes)

router.get('/textnote/:id/edit', function(req,res){
	res.render('app/textnote/edit')
}),

//router.get('/logout', function(req,res){
		//req.logout();
		//res.render('app/logout')
//})
router.get('/Vbook-signin',function(req,res){
		res.render('vbook/signin')
}),

/*PARA ANOTACIONES*/
router.route('/textnote/:id')

	.get(function(req, res){
		res.render('app/textnote/show')
	})
	/*EDITAR UN REGISTRO*/
	.put(function(req, res){
		res.locals.notacion.title = req.body.title
		res.locals.notacion.text = req.body.text
		res.locals.notacion.save(function(err){
			if(!err){
				res.render('app/textnote/show')
			} else {
				res.render('app/textnote/'+req.params.id+'/edit')
			}
		})
	})
	/*FIN DE EDITAR UN REGISTRO*/
	.delete(function(req,res){
		//Eliminar imagenes
		Note.findOneAndRemove({_id: req.params.id}, function(err){
			if(!err){
				res.redirect('/app/textnote')
			}else{
				console.log(err)
				res.redirect('app/textnote'+req.params.id)
			}
		})
	})
/*Fin de imagenes*/
router.route('/textnote')
	.get(function(req, res){
		Note.find({creator : res.locals.user._id}, function(err,notes){
			if(err){res.redirect('/app'); return;}

			res.render('app/textnote/index', {notes : notes})	
		
		})
	})
	.post(function(req, res){
		console.log(res.locals.user._id)
		var data_user = {
			title : req.body.title,
			text : req.body.text,
			creator: res.locals.user._id
		}
		var notacion = new Note(data_user)

		notacion.save(function(err){
			if(!err){
				res.redirect('/app/textnote/'+notacion._id)
			}
			else{
				console.log(notacion)
				res.render(err)
			}
		})
	})



//PARA EDICION DE DATOS PERSONALES
//FALTA CREAR LA VISTA DE PREFIL/EDITAR


/*router.get('/profile/:id/edit', function(req,res){
	Vbook.findById(req.params.id, function(err, datos){
		res.render('app/profile/edit', {datos:datos})
	})
})

router.route('/profile/:id')
	.get(function(req,res){
		Vbook.findById(req.params.id, function(err, datos){
			res.render('app/profile/show', {datos:datos})
		})
	})
	.put(function(req,res){
		Vbook.findById(req.params.id, function(err, datos){
			datos.name = req.body.comp_name
			datos.save(function(err){
				if(!err){
					res.render('app/profile/show',{datos:datos})
				} else {
					res.render('app/profile/'+datos.id+'/edit', {datos:datos})
				}
			}) 
			res.render('app/profile/show', {datos:datos})
		})
	})*/



module.exports = router