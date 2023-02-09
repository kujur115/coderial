module.exports.profile=function(req,res){
    return res.end('<h1>User Profile</h1>');
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
    // todo latter
}

// sign in and create a session for user
module.exports.createSession = (req,res)=>{
    // todo latter
}