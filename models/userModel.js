import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
     name:{
          type:String,
          required:true,
          trim:true          //remove white space
     },email:{
          type:String,
          required:true,
          unique:true        //only one user can login from same email 
     },password:{
          type:String,
          required:true,
     },
     phone:{
          type:String,
          required:true,
     },
     address:{
          type:String,
          required:true,
     },
     answer:{
          type:String,
          required:true,
     },
     role:{
          type:Number,
          default:0          //0 means false
     }
},
{timestamps:true}           //register time of new user is added here 
)

export default mongoose.model('users',userSchema)