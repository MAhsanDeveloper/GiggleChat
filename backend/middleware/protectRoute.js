import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const protectRoute = async (req,res,next) =>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json("Unauthorized - no token provided");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json("Unauthorized - invalid token");
        }

        const user = await User.findById(decoded.userId).select("-password"); // -password means exclude password from response

        if(!user){
            return res.status(401).json("User not found");
        }

        req.user = user; //this req.user is allowing us to get the senderId in message.controller.js.  the user on right side of equals to is our user that we will get from database

        next(); // next() means that after all above commands, execute the next function which is sendMessage
    } catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        res.status(500).json("Internal server error");
    }
};

export default protectRoute;