const User=require('../../../models/user');
const jwt=require('jsonwebtoken');


module.exports.createSession =async (req, res) => {
    try {
        let user =await User.findOne({email:req.body.email});
        if(!user || user.password!=req.body.password){
            return req.json(422,{
                message:"Invalid user or password"
            });
        }

        return res.json(200,{
            message:'Sign in successfull, here is your token, please keep it safe!',
            data:{
                token: jwt.sign(user.toJSON(),"coderial",{
                    expiresIn:'1000000'
                })
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
          message:"internal server Error"
        });
    }
   
  };