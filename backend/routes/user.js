const router= require("express").Router();
const User = require("../models/user");
const bcrypt =require("bcryptjs");
const jwt=require("jsonwebtoken");
const {authenticateToken}=require("./userAuth");
const user = require("../models/user");

//SIGN UP
router.post("/sign-up", async (req, res) => {
   try {
     const { username, email, password, address } = req.body;
     
     // Validate username length
     if (username.length <= 4) {
       return res.status(400).json({ message: "Username length should be greater than 4" });
     }
 
     // Check existing username
     const existingUsername = await User.findOne({ username });
     if (existingUsername) {
       return res.status(400).json({ message: "Username already exists" });
     }
 
     // Check existing email
     const existingEmail = await User.findOne({ email });
     if (existingEmail) {
       return res.status(400).json({ message: "Email already exists" });
     }
 
     // Validate password length
     if (password.length < 8) {
       return res.status(400).json({ message: "Password length should be greater than 8" });
     }
 
     // Hash password
     const hashedPassword = await bcrypt.hash(password, 10);
 
     // Create new user
     const newUser = new User({
       username,
       email,
       password: hashedPassword,
       address
     });
 
     // Save new user
     await newUser.save();
     return res.status(200).json({ message: "Signed Up successfully" });
   } catch (error) {
     console.error(error);
     res.status(500).json({ message: "Internal Server Error" });
   }
});

//LOGIN
router.post("/sign-in", async(req, res)=>{
   try{
      const {username,password}=req.body;
      const existingUser= await User.findOne({username});
      if(!existingUser){
         res
         .status(400)
         .json({message: "No existing user found"})
      }
      await bcrypt.compare(password,existingUser.password, (err,data)=>{
         if(data){

            //Creating a jwt token
            const authClaims={
                  name: existingUser.username,
                  role: existingUser.role
            }                                  //password is sattu05
            const token= jwt.sign(authClaims,"sattu05",{expiresIn: "30d"});
            res
               .status(200)
               .json({message: "Signed in Successfully",
                  id: existingUser._id,
                  role: existingUser.role,
                  token:token})
         }else{
            res
            .status(400)
            .json({message: "Invalid Credentials"})
         }
      })
   }catch(error){
      console.error(error);
      res
      .status(500)
      .json({message: "Internal Server Error"})
   }
})

//Get User Information by token
router.get("/getuserinfo",authenticateToken, async(req, res)=>{
   try{
      const {id}=req.headers;
      const data= await User.findById(id).select("-password");//select -password to not display password
      return res.status(200).json(data);
   }catch(error){
      res
      .status(500)
      .json({message: "Internal Server Error"})
   }
})

//UPDATE ADDRESS
router.put("/update-address",authenticateToken,async(req,res)=>{
   try {
      const {id}=req.headers;
      const {address}=req.body;
      await User.findByIdAndUpdate(id,{address:address});
      return res
      .status(200)
      .json({message: "Address Updated Successfully"});
   } catch (error) {
      res
      .status(500)
      .json({message:"Internal Server Error"});
   }
})
module.exports=router;
