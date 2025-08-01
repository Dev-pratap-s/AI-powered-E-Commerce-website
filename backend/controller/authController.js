import User from '../model/userModels.js';
import { gentoken } from '../config/token.js';
import { gentoken1 } from '../config/token.js';  // ✅ Correct
import bcrypt from 'bcrypt';
import validator from 'validator';


export const Registration = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // ✅ Check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // ✅ Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // ✅ Validate password length
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" });
        }

        // ✅ Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Create new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });
        console.log(newUser)

        // ✅ Generate token
        const token = await gentoken(newUser._id);

        // ✅ Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(201).json(newUser);

    } catch (error) {
        console.error("❌ Error in Registration:", error);
        res.status(500).json({ message: "Registration error" });
    }
};

export const login = async (req, res) => {
    try {
        let { email, password } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User is not defined" });
        }

        // ✅ Check password
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // ✅ Generate token
        const token = await gentoken(user._id);

            console.log("Generated Token:", token); 
        // ✅ Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // 🔁 set true in production
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        // ✅ Return success response
        return res.status(200).json({ message: "Login successful", user });

    } catch (error) {
        console.log("login nhi hua yr")
        console.error("❌ Error in login:", error);
        res.status(500).json({ message: "Login error" });
    }
};
export const logout = async (req, res) => { 
  try {
    // ✅ Clear the cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,       // Localhost pe agar dikkat aaye to false kar dena
      sameSite: "Lax"
    });

    console.log("✅ User logged out successfully");  // ✅ Console confirmation

   return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("❌ Error in logout:", error);
    res.status(500).json({ message: "Logout error" });
  }
};


export const googleLogin = async (req,res)=>{
    try{
        let {name , email} = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({name, email})
        }

         const token = await gentoken(user._id);

            console.log("Generated Token:", token); 
        // ✅ Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // 🔁 set true in production
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(200).json({
            message:"filfull by google"
        })

    }
    catch(err){
        console.log("google login error")

    }
}

export const adminLogin = async (req, res) => {
    try {
        let { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            let token = gentoken1(email, "admin"); // ✅ Fixed: include role

            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "Strict",
                maxAge: 1 * 24 * 60 * 60 * 1000
            });

            return res.status(200).json(token);
        }

        return res.status(400).json({ message: "Invalid credentials" });

    } catch (error) {
        console.log("AdminLogin error");
        return res.status(500).json({ message: `AdminLogin error ${error}` });
    }
};
