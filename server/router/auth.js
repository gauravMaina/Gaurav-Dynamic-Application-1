const express = require('express');
const router = express.Router();
const cookieParser= require('cookie-parser');
const bcrypt = require('bcryptjs');
const User = require('../model/userSchema')
const authentication = require('../middleware/authentication');
router.use(cookieParser());
router.get('/',(req,res)=>{
    res.send("Welcome from Server Router");
});

router.post('/register',async(req,res)=>{
    const{ name , email , phone , work , password , cpassword} = req.body;
      if(!name||!email||!phone||!work||!password||!cpassword)
      {
         return res.status(422).json({error : "please filled the field" });
      }
        try {
            const userExist= await  User.findOne({ email:email }); 
          if(userExist)
          {
              return res.status(422).json({error : " This Email is allready exist" });
          } else if(password !=cpassword)
          {              
            return res.status(422).json({error : " Password Not Matching " });
          }else
          {           
        const user = new User({name,email,phone,work,password,cpassword});
        await user.save();
        res.status(201).json({message:"User Registration successful"});
          }
        
        } catch (error) {
            console.log(error);
        }   
});
         router.post('/signin',async(req,res)=>{      
           try 
           { let token;
            const {email,password}= req.body;
            if(!email||!password)
            {
                return res.status(400).json({message:"Please enter the fields"});
            }
               const userlogin = await User.findOne({email:email});
               if(userlogin)
               {
                // const isMatch = await bcrypt.compare(password,userlogin.password)
                  let isMatch = false;
                  if(password===userlogin.password)
                  {
                    isMatch=true;
                  }
                token = await userlogin.generateAuthToken();
                 res.cookie("jwtoken",token,{
                     expires: new Date(Date.now() + 25892000000 ),
                     httpOnly:true
                 });
                 console.log(password+" "+userlogin.password)
                 console.log(isMatch)
                if(!isMatch)
                {
                  res.status(400).json({error:"Password not matching"});
                }   else
                {         
                res.status(201).json({message:"User Login Successfully"});
                }
               }
               else
               {
                res.status(400).json({error:"Email not matching"});                    
               }
           } catch (error) {
               console.log(error);
           }
         })
        //  Abaout us page
router.get('/about',authentication,(req,res)=>{
  console.log("this the About Page");
  // console.log(req.cookies.jwtoken);
  res.send(req.rootUser);
});

router.get('/getData',authentication,(req,res)=>{
  console.log("this the Contact Page");
  // console.log(req.cookies.jwtoken);
  res.send(req.rootUser);
});
router.post('/contact',authentication, async (req,res)=>{
  try {
   
const {name,email,phone,message} = req.body;
if(!name || !email|| !phone || !message){
  console.log(" contact form error");
  res.json({error:" plizz filled Contact form"});
}
 const userContact = await User.findOne({_id:req.userId});
if(userContact)
{
  const userMessage = await userContact.addMessage(name,email,phone,message);
  
  await userContact.save();
  res.status(201).json({ message:"User Contact Successfully" });
} 
} catch (error) {
  console.log(error);
}
});
     //  Logout page
     router.get('/logout',authentication,(req,res)=>{
      res.clearCookie('jwtoken')
      console.log("hello this is the Logout Page");
      res.status(200).send("Logout Successfully");
    });
module.exports = router;