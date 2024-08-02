import User from "../models/userModel.js";

export const getUsersForSidebar = async(req,res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUser = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        res.status(200)
        .json(filteredUser)
    } catch (error) {
        console.log(error.message);
        res.status(500)
        .json({
            success:false,
            message:"Error! While fetching users for sidebar...",
            error:"Internal Server Error..."
        })
    }
}