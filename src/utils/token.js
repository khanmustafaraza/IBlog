import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email }, // payload
        process.env.JWT_SECRET,              // secret key
        { expiresIn: "1h" }                  // options
    );
};

export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        return null;
    }
};