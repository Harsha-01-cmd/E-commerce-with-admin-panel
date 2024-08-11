const router= require("express").Router();
const User = require("../models/user");
const {authenticateToken}=require("./userAuth");

//ADD TO FAVOURITE
router.put("/add-fav",authenticateToken,async(req,res)=>{
   try {
      const {clothid,id}=req.headers;
      const userData= await User.findById(id);
      const isFav=userData.favourites.includes(clothid);
      if(isFav){
         return res
         .status(200)
         .json({message:"Already in Favourites"});
      }
      await User.findByIdAndUpdate(id, {$push:{favourites: clothid}});
      return res
      .status(200)
      .json({message: "Added to Favourites Successfully"});
   } catch (error) {
      res
      .status(500)
      .json({message:"Internal Server Error"});
   }
});

//DELETE FROM FAVOURITES
router.delete("/delete-fav",authenticateToken,async(req,res)=>{
   try {
      const {clothid,id}=req.headers;
      const userData= await User.findById(id);
      const isFav=userData.favourites.includes(clothid);
      if(!isFav){
         return res
         .status(200)
         .json({message:"Not in Favourites"});
      }
      await User.findByIdAndUpdate(id,{$pull:{favourites:clothid}});
      return res
      .status(200)
      .json({message: "Removed from Favourites"});
   } catch (error) {
      res
      .status(500)
      .json({message:"Internal Server Error"});
   }
});

//GET ALL ITEMS FROM FAVOURITE
router.get("/get-all-fav",authenticateToken,async(req,res)=>{
   try {
      const {id}=req.headers;
      const userData=await User.findById(id).populate("favourites"); //populate to fetch all details
      const userFav=userData.favourites;
      return res
      .status(200)
      .json({message: "Details Fetched Successfully",data: userFav});
   } catch (error) {
      res
      .status(500)
      .json({message:"Internal Server Error"});
   }
});
module.exports=router;

