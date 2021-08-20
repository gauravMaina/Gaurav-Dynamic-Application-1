const jwt = require('jsonwebtoken');
const User = require('../model/userSchema')
const Authentication = async(req ,res ,next )=>
{
  try {
      const token = req.cookies.jwtoken;
      
      const verifyToken = jwt.verify(token,process.env.SECREAT_KEY);
      console.log(verifyToken);
      const rootUser = await User.findOne({_id:verifyToken._id,"tokens.token":token});
      if(!rootUser){ throw new Error("User Not Found")};
      req.token= token;
      req.rootUser= rootUser;
      req.userId= rootUser._id;
      console.log(rootUser.name);
      console.log(rootUser._id);
      console.log(token);
      next();
  } catch (error) {
      res.status(404).send("UnAuthraised User:No token Provided ");
      console.log(error);
  }
}
module.exports = Authentication;