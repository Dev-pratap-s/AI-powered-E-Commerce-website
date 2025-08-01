
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const gentoken = (userId) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return token;
    } catch (error) {
        console.log("❌ Token error");
        console.error("Error generating token:", error);
        throw new Error("Token generation failed");
    }
};

export const gentoken1 = (email, role) => {
    try {
        const token = jwt.sign({ email, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return token;
    } catch (error) {
        console.log("❌ Token error");
        console.error("Error generating token:", error);
        throw new Error("Token generation failed");
    }
};

