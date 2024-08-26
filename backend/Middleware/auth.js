const jwt = require("jsonwebtoken")

const JWT_SECRET="hello"

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
 

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ msg: "No token provided or invalid format" });
  }

  const token = authHeader.split(' ')[1];
  

  try {
    const decode = jwt.verify(token, JWT_SECRET);
    req.user=decode.userId
    if (decode.userId) {
      req.userId = decode.userId._id;
      
      next();
    } else {
      return res.json({ msg: "Invalid token structure: userId not found" });
    }
  } catch (err) {
    
    return res.json({ msg: "Token verification failed" });
  }
};




module.exports=authMiddleware


