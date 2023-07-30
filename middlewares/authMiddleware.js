import JWT from 'jsonwebtoken';
import userModel from '../models/userModel.js';

//Protected Routes via token base
export const requireSignIn =async(req,res,next)=>{
     try{
          const decode=JWT.verify(req.headers.authorization,process.env.JWT_SECRET)  //here incode is happen
          req.user=decode     //here decode is happen                                                            
          next()
     }catch(error){
          // console.log(error)
     }
}

//admin access
export const isAdmin=async (req,res,next)=>{
     try{
          const user = await userModel.findById(req.user._id)
          if(user.role!==1){
               //when users try to access admin dashboard then they will nevigate to home page (but with error of 401 i don`t know why?)
               // return res.status(401).send({
               //      success:false,
               //      message:'UnAuthorized Access'
               // })
          }else{
               next()
          }
     }catch(error){
          // console.log(error)
          res.status(401).send({
               success:false,
               error,
               message:'Error in admin middleware',
          })
     }
}