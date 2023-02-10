const User =require('../models/user');
module.exports.profile=function(req,res){
    
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,(err,user)=>{
            if(user){
                return res.render('user_profile',{
                    title: "User Profile",
                    user: user
                });
            }else{return res.redirect('/users/sign-in');}
        })
        
    }else{
        return res.redirect('/users/sign-in');
    }
}

module.exports.post=(req,res)=>{
    return res.end('<h1>User Post</h1>');
}


module.exports.signUp =(req,res)=>{
    return res.render('user_sign_up',{
        title: "Coderial | Sign Up"
    });
}

// render the sign in page
module.exports.signIn =(req,res)=>{
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
    // find the user
    User.findOne({'email' : req.body.email},(err,user)=>{
        if(err){console.log('error in finding user in signing up');return;}
    // handle user found
        if(user){
            // handle password which dont match
            if(user.password != req.body.password){
                return res.redirect('back');
            }


        // handle session creation
        res.cookie('user_id',user.id);
        return res.redirect('/users/profile');

        }else{
        // handle user not found
            return res.redirect('back');
    }
});
}