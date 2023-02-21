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
module.exports.destroy = (req,res)=>{
    Comment.findById(req.params.id,(err,comment)=>{
        if(comment.user==req.user.id){
            let postId=comment.post;
            comment.remove();
            Post.findByIdAndUpdate(postId,{$pull:{comments: req.params.id}},(err,post)=>{
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    })
}