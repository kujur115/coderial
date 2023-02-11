const passport=require('passport');


const LocalStrategy = require('passport-local').Strategy;

const User =require('../models/user');

//  authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
},
{
    function(email,passport,done){
        // find a user and establish the identity
        User.findOne({email: email},(err,user)=>{
            if(err){
                console.log('Error in finding user ----> Passport');
                return done(err);
            }

            if(!user || user.passport!=passport){
                console.log('Invalid User/Passport');
                return done(null,false);
            }

            return done(null, user);
        })

    }
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


module.exports = passport;