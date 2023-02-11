const passport=require('passport');


const LocalStrategy = require('passport-local').Strategy;

const User =require('../models/user');

//  authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
    // passwordField: 'password',
    // passReqToCallback: true,
},

    function(email,passport,done){
        // find a user and establish the identity
        User.findOne({email: email},(err,user)=>{
            if(err){
                console.log('Error in finding user ----> Passport');
                return done(err);
            }

            if(!user || user.password!=passport){
                console.log('Invalid User/Passport');
                return done(null,false);
            }

            return done(null, user);
        })

    }

));


// serializing the user to decide which key is to be kept in the cookies

passport.serializeUser((user,done)=>{
    done(null, user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,user)=>{
        if(err){
            console.log('Error in finding user ---> Passport');
            return done(err);
        }
        return done(null,user);
    });
});


// check if the user is authentucated
passport.checkAuthentication=function(req,res,next){
    // if the user is signed in, then pass on the request to the next function (controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=(req,res,next)=>{
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for views
        res.locals.user =req.user;
    }
    next();
}


module.exports = passport;