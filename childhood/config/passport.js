const LocalStrategy=require('passport-local').Strategy;
const mongoose=require('mongoose');

const User=require('../models/user');

module.exports = function(passport){
    passport.use(
        new LocalStrategy({
            usernameField: 'email',
            passwordField: 'pass',
            passReqToCallback: true
        },(req, mail, password, done)=>{
            User.findOne({ email: mail }).then(user => {
                if(!user)
                    return done(null, false, req.flash('error_msg', "User does not exist"));
                else{
                    var buf=new Buffer(user.password, 'base64');
                     if(buf.toString('ascii')!==password) 
                        return done(null, false, req.flash('error_msg', "incorrect password"));
                    else return done(null, user);
                }
            });

        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}