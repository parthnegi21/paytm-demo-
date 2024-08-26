const express = require("express")
const usermiddleware= require("../Middleware/user")
const {User,Account}= require("../db")
const router = express.Router()

const jwt = require('jsonwebtoken');
const  authMiddleware =require("../Middleware/auth")
const { uservalidate, updateone } = require('../validate/validate');
const JWT_SECRET = "hello"




router.post('/signup', async (req, res) => {

  const validationResult = uservalidate.safeParse(req.body);

  if (!validationResult.success) {
return res.status(400).json({
    msg: 'Validation failed',
    errors: validationResult.error.errors
});
}
else{
const finduser= await User.findOne({
  username:req.body.username
  
})
if(finduser){
res.json("This username already exist try different")
}
else{

const user = await User.create({
    
    username:req.body.username,
    password:req.body.password,
    firstname:req.body.firstname,
    lastname:req.body.lastname
    
})



const userId= user



await Account.create({
  userId,
  balance:1+Math.random()*10000
})



  
  
const token=jwt.sign({userId},JWT_SECRET)

  res.json({msg:"Account Created Successfully",
    token:token
  
})
}
}
})





router.get('/signin',usermiddleware ,async(req,res)=>{
  
  const user = req.user

  
  
  const token=jwt.sign({userId:user},JWT_SECRET)
  
    res.json({msg:"sign in successfully",
      token:token,
      

    })

  
  })


  router.put('/update', authMiddleware, async (req, res) => {
    const updation = updateone.safeParse(req.body);
    
    if (!updation.success) {
      return res.status(400).json({
        msg: 'Validation error',
        errors: updation.error.errors,
      });
    }

    
      const result = await User.updateOne(
        { _id: req.userId }, // Find the document by _id
        { $set: req.body }  // Update fields specified in req.body
      );
  
      if (result.modifiedCount === 0) {
        return res.status(404).json({ msg: "User not found or no changes made" });
      }
  
      
      res.json({ msg: "Profile updated" });
  
    
  });


  router.get('/bulk',authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";
    const userId = req.userId;  // Assuming `req.user._id` is available from authentication middleware
    
    
      const users = await User.find({
        $and: [
          { _id: { $ne: userId } },  // Exclude the user's own profile
          {
            $or: [
              { firstname: { "$regex": filter, "$options": "i" } },  // Case-insensitive search
              { lastname: { "$regex": filter, "$options": "i" } }
            ]
          }
        ]
      });
    
      res.json({
        users: users.map(user => ({
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          _id: user._id
        }))
      });
    
  });
  




router.get('/check',authMiddleware,(req,res)=>{
  res.json({msg:"user is correct"})
})



router.get('/info',authMiddleware,(req,res)=>{
  const user=req.user
  res.json({
    user:user
  })
})
  
  
  module.exports = router;