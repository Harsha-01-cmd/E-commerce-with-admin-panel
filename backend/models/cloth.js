const mongoose =require("mongoose");

const cloth=new mongoose.Schema({
   url:
   {
      type: String,
      required: true,
   },
   title:
   {
      type: String,
      required: true,
   },
   agency:
   {
      type: String,
      required: true,
   },
   price:
   {
      type: Number,
      required: true,
   },
   description:
   {
      type: String,
      required: true,
   },
})

module.exports=mongoose.model("cloths",cloth);