var express = require('express');
var router = express.Router();
var knex = require('../db/knex')
var locus = require('locus');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
require('dotenv').config();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'PixelTapestry' });
});

router.post('/new', function(req,res,next){

	knex('users').where({email:req.body.email }).first().then(function(user){
		if (user || req.body.password !== req.body.passwordConfirm){
			res.send('DANGER: USERNAME/PASSWORD ERROR');
		} else { bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(req.body.password, salt, function(err, hash){

            knex('users').insert({email: req.body.email, email:req.body.email, password: hash}).returning('id').then(function(id){
              var token = jwt.sign({
              				email: req.body.email,
             				}, process.env.JWT_SECRET);

              res.json({jwt:token, id:id})
            });
          });
        });
      }
	})
})

router.post('/login', function(req,res,next){
	knex('users').where({email:req.body.email}).first().then(function(user){
		if(user){
			var pass = req.body.password;

			bcrypt.compare(pass,user.password,function(err,result){
				if(err){
					console.log(err);
					res.send('Failed Login Attempt');
				} else {
					var token = jwt.sign({
						email:req.body.email,	
					}, process.env.JWT_SECRET)

              	res.json({jwt:token, id:user.id})
				}

				})
			}
	})
})

router.post('/savetapestry', function(req,res,next){
	
})

module.exports = router;
