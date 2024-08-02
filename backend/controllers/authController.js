import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async(req,res) => {
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body;

        if(password !== confirmPassword){
            return res.status(400)
            .json({
                success:false,
                message:"OOPS!! Password didn't macth..."
            });
        }

        const user = await User.findOne({username});
        if(user){
            return res.status(400)
            .json({
                success:false,
                message:"Same Username already exist..."
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilePic: gender === 'Female' ? boyProfilePic : girProfilePic
        });

        generateTokenAndSetCookie(newUser._id,res);
        await newUser.save();

        res.status(201)
        .json({
            success:true,
            message:"User created successfully...",
            user:{
                ...newUser._doc,
                password:""
            }
        })


    } catch (error) {
        console.log(error.message);
        res.status(500)
        .json({
            success:false,
            message:"Error! While SignUp"
        })
    }
}

export const login = async(req,res) => {
    try {
        const {username,password} = req.body;

        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password,user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400)
            .json({
                success:false,
                message:"Invalid Credentials...",
                error:"Invalid Credentials..."
            });
        }

        generateTokenAndSetCookie(user._id,res);

        res.status(200)
        .json({
            success:true,
            message:"Logged In Successfully...",
            _id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic
        })
    } catch (error) {
        console.log(error.message);
        res.status(500)
        .json({
            success:false,
            message:"Error! While Login",
            error:"Internal Server Error"
        })
    }
}

export const logout = (req,res) => {
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200)
        .json({
            success:true,
            message:"Logged Out Successfully..."
        })
        
    } catch (error) {
        console.log(error.message);
        res.status(500)
        .json({
            success:false,
            message:"Error! While Logout",
            error:"Internal Server Error..."
        })
    }
}