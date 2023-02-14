const Post= require('../models/post');

module.exports.home=function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',24);


    // Post.find({},function(err,post){
    //     return res.render('home',{
    //         title:"Coderial | Home",
    //         posts: post
    //     });
    // });

    Post.find({}).populate('user').exec((err,post)=>{
        return res.render('home',{
            title:"Coderial | Home",
            posts: post
        });
    });
    
}