import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import Car from "../models/Car.js";



//Generate JWT Token
const generateToken = (userId)=>{
    const payload = userId
    return jwt.sign(payload, process.env.JWT_SECRET)
}

//Register USer
export const registerUser = async (req,res)=>{
    try {
        const { name, email, password} = req.body

        if(!name || !email || !password || password.length < 8){
            return res.status(400).json({ success: false, message: 'All fields are required and password must be at least 8 characters.' });
        }

        const userExists = await User.findOne({email})
        if(userExists){
            return res.json({success: false, message: 'User Already Exists'})
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const user = await User.create({name, email,password: hashedPassword})
        const token=generateToken(user._id.toString())
        res.json({success: true, token})

    }catch (error){
        console.log(error.message);
        return res.json({success: false, message: error.message})
    }
}

//User Login
export const loginUser = async(req, res)=>{
    try{
        const {email, password}=req.body
        const user= await User.findOne({email})
        if(!user){
            return res.json({success: false, message: "User not found!"})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.json({success: false, message: "Invalid Credentials"})
        }
        const token=generateToken(user._id.toString())
        res.json({success: true, token})
    }catch(error){
         console.log(error.message);
        return res.json({success: false, message: error.message})
    }
}
// Get User data using token (JWT)
export const getUserData = async (req,res) => {
    try{
        const {user} = req;
        res.json({success:true, user})
    }catch(error){
        console.log(error.message);
        return res.json({success: false, message: error.message})
    }
}
//Get all cars for the front end
export const getCars = async (req,res) => {
    try{
        const cars = await Car.find()
        res.json({success: true,cars })
    }catch(error){
        console.log(error.message)
        res.json({success: false, message: error.message})
    }
}
// Logout User
export const logoutUser = (req, res) => {
    try {
        // If using HTTP-only cookies, clear it
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'None',
            secure: true // only in production
        });
        return res.json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};
