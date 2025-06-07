import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {

        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password"); // -password means exclude password from response
        //This basically means that we want all users except the logged in user. 
        //find() returns an array of all the users except the logged in user, we won't get the logged in user because $ne means not equal to in mongodb, meaning that find all users except the logged in user
        // if we simply write User.find() then we will get all users including the logged in user

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("Error in getUsersforSidebar controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};