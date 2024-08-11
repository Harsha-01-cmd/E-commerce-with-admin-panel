const jwt=require("jsonwebtoken");

const authenticateToken=(req,res,next)=>{
   const authHeader=req.headers["authorization"];
   const token=authHeader && authHeader.split(" ")[1];
   // console.log('Token:', token);
   if(token==null){
      return res
      .status(401)
      .json({message: "Authentication Token Required"});
   }

   jwt.verify(token,"sattu05",(err,user)=>{
      if(err){
         // console.log(err);
         return res
         .status(403)
         .json({message: "Token expired! Please SignIn Again"});
      }
      req.user=user;
      next();
   });
}
module.exports={authenticateToken};