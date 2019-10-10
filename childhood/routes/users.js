const express=require('express');
const router=express.Router();
const User=require('../models/user');
const passport=require('passport');
const { ensureAuthenticated }=require('../config/auth');

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) =>{
    console.log("hello".toString('base64'));
	let errors=[];

    if(!req.body.username || !req.body.email || !req.body.pass || !req.body.pass2) errors.push({msg: "Fill all da"});	
	
	else if(req.body.pass!==req.body.pass2) errors.push({msg: "matching da"});
	
	else if(req.body.pass.length<6) errors.push({msg: "longer da"});
	
	if(errors.length>0){
		res.render('register', {errors});
	}else{
		User.findOne({email: req.body.email}).then(user => {
			if(user){
				errors.push({msg: "already exists da"});
				res.render('register', {
					errors
				});
			} else{
                var buf=new Buffer(req.body.pass);
				const newUser= new User({
					username: req.body.username, 
					email: req.body.email,
					password: buf.toString('base64'),
                });
				newUser.save().then(user=>{
					req.flash('success_msg', 'Registration complete, you may now sign in');
					res.redirect('/users/login');
				}).catch(err=>console.log(err));
			}
		});
    }
    console.log(errors);
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
		successRedirect: '/users/home',
		failureRedirect: '/users/login',
		failureFlash: true
    })(req, res, next);
});

router.get('/home', ensureAuthenticated, (req, res) => {
    res.render('home');
});

router.get('/learn', ensureAuthenticated, (req, res) => {
	res.render('learn');
});

router.get('/learn/beginner', ensureAuthenticated, (req, res) => {
	res.render('beginner');
});

router.get('/learn/intermediate', ensureAuthenticated, (req, res) => {
	res.render('intermediate');
});

router.get('/learn/expert', ensureAuthenticated, (req, res) => {
	res.render('expert');
});

router.get('/profile', ensureAuthenticated, (req, res) => {
	res.render('profile', {username: req.user.username, email: req.user.email});
});

module.exports=router;