const mongoose = require("mongoose");
const user= new mongoose.Schema({
   username: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
   address: {
      type: String,
      required: true,
   },
   avatar: {
      type: String,
      default:"/utilities/usericon.png"
   },
   role: {
      type: String,
      default: "user",
      enum: ["user","admin"],
   },
   favourites: [
      {
         type: mongoose.Types.ObjectId,
         ref: "cloths"
      }
   ],
   cart: [
      {
         type: mongoose.Types.ObjectId,
         ref: "cloths"
      }
   ],
   orders: [
      {
         type: mongoose.Types.ObjectId,
         ref: "order"
      }
   ],
   
}, {timestamps: true}
)

module.exports=mongoose.model("user",user);