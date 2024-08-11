const mongoose =require("mongoose");

const order=new mongoose.Schema({
   user:
   {
      type: mongoose.Types.ObjectId,  //yaha par array of object nhi hai , sirf obj hai kyuki ek user ek time par ek hi order kar sakta hai na
      ref: "user"
   },
   cloth:
   {
      type: mongoose.Types.ObjectId,
      ref: "cloths"
   },
   status:
   {
      type: String,
      default: "Order Placed",
      enum: ["Order Placed","Out for Delivery","Delivered","Cancelled"]
   }
},{timestamps: true});       //taaki sort kar sake orders ko

module.exports=mongoose.model("order",order);