import User from '../model/userModels.js';
import { gentoken, gentoken1 } from '../config/token.js';
import bcrypt from 'bcrypt';
import validator from 'validator';

// ================= REGISTER =================
export const Registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email format"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = await gentoken(newUser._id);

    return res.status(201).json({
      message: "Registration successful",
      token,
      user: newUser
    });

  } catch (error) {
    console.error("Registration Error:", error);

    return res.status(500).json({
      message: "Registration error"
    });
  }
};

// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    const token = await gentoken(user._id);

    return res.status(200).json({
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      message: "Login error"
    });
  }
};

// ================= LOGOUT =================
export const logout = async (req, res) => {
  try {
    return res.status(200).json({
      message: "Logout successful"
    });
  } catch (error) {
    return res.status(500).json({
      message: "Logout error"
    });
  }
};

// ================= GOOGLE LOGIN =================
export const googleLogin = async (req, res) => {
  try {

    const { name, email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email
      });
    }

    const token = await gentoken(user._id);

    return res.status(200).json({
      message: "Google login successful",
      token,
      user
    });

  } catch (error) {
    console.log("Google Login Error");

    return res.status(500).json({
      message: "Google Login Error"
    });
  }
};

// ================= ADMIN LOGIN =================
export const adminLogin = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {

      const token = gentoken1(
        email,
        "admin"
      );

      return res.status(200).json({
        message: "Admin login successful",
        token
      });
    }

    return res.status(400).json({
      message: "Invalid credentials"
    });

  } catch (error) {

    return res.status(500).json({
      message: `AdminLogin error ${error}`
    });
  }
};
