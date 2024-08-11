const mongoose =require("mongoose");

//database connection
const conn=async()=>{
   try {
      await mongoose.connect(`${process.env.URI}`);    
      console.log("Connected to Database");
   } catch (error) {
      console.log(error);
   }
}

conn();