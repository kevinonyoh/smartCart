
import mongoose from "../config/smartCartDB.js";



const userSchema = new mongoose.Schema(
{
    email: {
        type: String,
        trim: true,
        required: true
    },
    phoneNumber: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    }})

const user = new mongoose.model("user", userSchema);

export default user;