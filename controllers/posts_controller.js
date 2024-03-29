const Post = require("../models/post");
const Comment = require("../models/comment");
const Like = require("../models/likes");

module.exports.create = async (req, res) => {
  // console.log(req.user)
  try {
    let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    if (req.xhr) {
      post = await post.populate('user', 'name').execPopulate();
      return res.status(200).json({
        data: {
          post: post,
        },
        message: "Post created",
        
      });
    }
    req.flash("success", "Post created successfully");
    return res.redirect("back");
  } catch (error) {
    req.flash("error", error);
    return;
  }
};
module.exports.destroy = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (post.user == req.user.id) {
      // .id means converting the object id into string


      await Like.deleteMany({likeable:post,onModel:'Post'});
      await Like.deleteMany({_id:{$in: post.co}})

      post.remove();
      await Comment.deleteMany({ post: req.params.id });

      if(req.xhr){
        return res.status(200).json({
          data:{
          post_id:req.params.id
          },
          message: "Post deleted !"
        })
      }

      req.flash("success", "Post deleted successfully");
      return res.redirect("back");
    } else {
      req.flash('error', 'You cannot delete this post!');
      return res.redirect("back");
    }
  } catch (error) {
    req.flash("error", error);
    return;
  }
};
