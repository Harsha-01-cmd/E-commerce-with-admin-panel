const router= require("express").Router();
const User = require("../models/user");
const {authenticateToken}=require("./userAuth");

// ADD TO CART
router.put("/add-cart", authenticateToken, async (req, res) => {
  try {
    const { clothid } = req.headers; // Extract clothid from headers
    const userId = req.user.id; // Assuming authenticateToken sets req.user
    if (!clothid || !userId) {
      return res.status(400).json({ message: "Missing required parameters" });
    }
    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    const isCart = userData.cart.includes(clothid);
    if (isCart) {
      return res.status(200).json({ message: "Already in Cart" });
    }
    await User.findByIdAndUpdate(userId, { $push: { cart: clothid } });
    return res.status(200).json({ message: "Added to Cart Successfully" });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



//DELETE FROM CART
router.delete("/delete-cart",authenticateToken,async(req,res)=>{
   try {
      const {clothid,id}=req.headers;
      const userData= await User.findById(id);
      const isCart=userData.cart.includes(clothid);
      if(!isCart){
         return res
         .status(200)
         .json({message:"Not in Cart"});
      }
      await User.findByIdAndUpdate(id,{$pull:{cart:clothid}});
      return res
      .status(200)
      .json({message: "Removed from Cart"});
   } catch (error) {
      res
      .status(500)
      .json({message:"Internal Server Error"});
   }
});

// GET ALL CART DATA
router.get("/get-all-cart", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id; // Ensure this is set correctly in authenticateToken middleware
    const userData = await User.findById(userId).populate("cart"); // Populate the cart field
    const userCart = userData.cart;
    console.log("User cart data fetched:", userCart);
    return res.status(200).json({ message: "Details Fetched Successfully", data: userCart });
  } catch (error) {
    console.error("Error fetching cart data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports=router;