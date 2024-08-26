const {User} = require("../db")
async function usermiddleware(req,res,next){
    const username=req.headers.username
    const password = req.headers.password

   const user =  await User.findOne({
        username:username,
        password: password
    })
    
    .then(function(user){
        if(user){
            
            
          req.user=user
            next();
        }
        else{
            res.json({msg:"user does not exist"})
            
        }
    })
}
module.exports= usermiddleware