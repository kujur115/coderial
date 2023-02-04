module.exports.profile=function(req,res){
    return res.end('<h1>User Profile</h1>');
}

module.exports.post=(req,res)=>{
    return res.end('<h1>User Post</h1>');
}