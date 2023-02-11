const User =require('../models/user');
module.exports.profile=function(req,res){
    return res.render('user_profile', {
        title: 'User Profile'
    });
}

module.exports.post=(req,res)=>{
    return res.end('<h1>User Post</h1>');
}


module.exports.signUp =(req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title: "Coderial | Sign Up"
    });
}

// render the sign in page
module.exports.signIn =(req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title: "Coderial | Sign In"
    });
}
// get the sign up data
module.exports.create = (req,res)=>{

    if(req.password!=req.confirm_password){
        // console.log('password mismatch');
        return res.redirect('back');
    }
    console.log(req.body);
    User.findOne({'email' : req.body.email},(err,user)=>{
        if(err){console.log('error in finding user in signing up');return;}

        if(!user){
            User.create(req.body,(err,user)=>{
                if(err){console.log('error in finding user in signing up');return;}

                return res.redirect('/users/sign-in');
            })
        }else{
            // console.log('user already exists:',user)
            return res.redirect('back');
        }
    })
}

// sign in and create a session for user
module.exports.createSession = (req,res)=>{
    return res.redirect('/');
}

module.exports.destroySession = (req,res)=>{
    req.logout((err)=>{
        if(err){
            console.log("error signing out", err);
            return;
        }
        return res.redirect('/');
    });

    
}