import mongoose from 'mongoose';
import  Color from 'colors';

const connectDB= async() =>{
     try{
          const conn=await mongoose.connect(process.env.MONGO_URL)
          // console.log(`connected To Mongodb Database ${conn.connection.host}`.bgMagenta.white)
     }catch(error){
          // console.log(`Error in Mongodb ${error}`.bgRed.white)
     }
}

export default connectDB;