 import jwt from "jsonwebtoken";

export const GenerateToken = (user,res) => {
    const payload = {
        id: user._id,
        email: user.email,
        
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN || "10d",
    });

    res.cookie("jwt",token,{
        httpOnly: true,
        secure : true,
        sameSite : "strict",
        maxAge : (1000 * 60 * 60 * 24 )* 7,
    });
    return token;
};