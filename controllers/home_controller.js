const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function (req, res) {
  // console.log(req.cookies);
  // res.cookie('user_id',24);

  // Post.find({},function(err,post){
  //     return res.render('home',{
  //         title:"Coderial | Home",
  //         posts: post
  //     });
  // });

  // without using async
  // Post.find({})
  // .populate('user')
  // .populate({
  //     path: 'comments',
  //     populate: {
  //         path: 'user'
  //     }
  // })
  // .exec((err,post)=>{
  //     User.find({},(err,users)=>{
  //         return res.render('home',{
  //             title:"Coderial | Home",
  //             posts: post,
  //             all_users: users
  //         });
  //     })

  // });

  // with async
  try {
    let posts = await Post.find({})
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });

    let users = await User.find({});

    return res.render("home", {
      title: "Coderial | Home",
      posts: posts,
      all_users: users,
    });
  } catch (error) {
    console.log("Error:", error);
    return;
  }
};
