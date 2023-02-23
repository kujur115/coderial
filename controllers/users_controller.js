const User = require("../models/user");

module.exports.profile = function (req, res) {
  User.findById(req.params.id, (err, user) => {
    return res.render("user_profile", {
      title: "User Profile",
      profile_user: user,
    });
  });
};
module.exports.update = (req, res) => {
  if (req.user.id == req.params.id) {
    User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
      return res.redirect("back");
    });
  } else {
    return res.status(401).send("Unauthorized");
  }
};

module.exports.post = (req, res) => {
  return res.end("<h1>User Post</h1>");
};

module.exports.signUp = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }

  return res.render("user_sign_up", {
    title: "Coderial | Sign Up",
  });
};

// render the sign in page
module.exports.signIn = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "Coderial | Sign In",
  });
};
// get the sign up data
module.exports.create = async (req, res) => {
  try {
    if (req.password != req.confirm_password) {
      // console.log('password mismatch');
      return res.redirect("back");
    }
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      await User.create(req.body);
      return res.redirect("/users/sign-in");
    } else {
      // console.log('user already exists:',user)
      return res.redirect("back");
    }
  } catch (error) {
    console.log("error in creating user in signing up", error);
    return;
  }

  // console.log(req.body);
};

// sign in and create a session for user
module.exports.createSession = (req, res) => {
  req.flash('success','Logged in Successfully');
  return res.redirect("/");
};

module.exports.destroySession = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log("error signing out", err);
      req.flash('error','Error Logging out');
      return;
    }
    req.flash('success','Logged out Successfully');
    return res.redirect("/");
  });
};
