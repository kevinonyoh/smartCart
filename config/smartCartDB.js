import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL)
.then(() => {console.log("database connected successfully")})
.catch((error)=>{
    console.error(error);
});


export default mongoose;