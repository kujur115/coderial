const Post = require('../models/post');
const Comment =require('../models/comment');


module.exports.create=(req,res)=>{
    // console.log(req.user)
    Post.create({
        content: req.body.content,
        user: req.user._id
    },(err,post)=>{
        if(err){console.log('error in creating a post'); return;}
        console.log(post);

        return res.redirect('back');
    });

};
module.exports.destroy = (req,res)=>{
    Post.findById(req.params.id,(err,post)=>{
        if(post.user== req.user.id){
            // .id means converting the object id into string
            post.remove();
            Comment.deleteMany({post: req.params.id},(err)=>{
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });


};