import User from "../model/userModels.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json(user);

  } catch (error) {
    console.log("getCurrentUser error:", error.message);
    return res.status(500).json({
      message: "error getting current user",
    });
  }
};

export const getAdmin = async (req, res) => {
  return res.status(200).json({
    message: "Hello Admin",
    email: req.user.email,
    role: req.user.role   // <-- yahan add karo
  });
};