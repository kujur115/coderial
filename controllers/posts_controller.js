const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.create = async (req, res) => {
  // console.log(req.user)
  try {
    await Post.create({
      content: req.body.content,
      user: req.user._id,
    });

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
      post.remove();
      await Comment.deleteMany({ post: req.params.id });

      req.flash("success", "Post deleted successfully");
      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (error) {
    req.flash("error", error);
    return;
  }
};
