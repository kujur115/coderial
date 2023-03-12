const Post = require("../../../models/post");
const User = require("../../../models/user");
const Comment= require('../../../models/comment')


module.exports.index= async function(req,res){


    // ? populate the user of each post
    let posts = await Post.find({})
      .sort('-createdAt')
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });

    return res.json(200,{
        message:"List of posts",
        posts:posts
    })
}

module.exports.destroy = async (req, res) => {
    try {
      let post = await Post.findById(req.params.id);
      if (post.user == req.user.id) {
        //? .id means converting the object id into string
        post.remove();
        await Comment.deleteMany({ post: req.params.id });

        return res.json(200,{
            message:"Post and associated comments deleted successfully"
        });

      } else {
        return res.json(401,{
          message:'You cannot delete this post!'
        });
      }
    } catch (error) {
        console.log(error);
      return res.status(500).json({
        message:"internal server Error"
      });
    }
  };
  