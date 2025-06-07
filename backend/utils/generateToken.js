import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d", //15d means 15 days
    }); 

    res.cookie("jwt", token, {
        httpOnly: true, //this will prevent xss attacks
        sameSite: "strict", //this will prevent xss attacks, CSRF attacks, forgery attacks
        maxAge: 15 * 24 * 60 * 60 * 1000,    // 15 days  
        secure: process.env.NODE_ENV !== "development", //this will make website secure in local host as well            
    });
};

export default generateTokenAndSetCookie;