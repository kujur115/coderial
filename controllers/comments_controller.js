const Comment = require('../models/comment');
const Post = require('../models/post')


module.exports.create=(req,res)=>{
    // console.log(req.user)
    Post.findById(req.body.post,(err,post)=>{
        if(post){
            Comment.create({
                content: req.body.content,
                post:req.body.post,
                user: req.user._id
            },(err,comment)=>{
                if(err){console.log('error in creating a comment'); return;}
                // console.log(post);
                post.comments.push(comment);
                post.save();
        
                return res.redirect('back');
            });
        }
    })
    

};