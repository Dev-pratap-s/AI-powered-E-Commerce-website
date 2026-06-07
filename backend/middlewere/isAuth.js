import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    console.log("req.cookies =", req.cookies);
    console.log("req.headers.cookie =", req.headers.cookie);

    const token =
      req.cookies?.token ||
      req.headers.cookie?.split("token=")[1]?.split(";")[0];

    if (!token) {
      return res.status(400).json({
        message: "user does not have token"
      });
    }

    const verifyToken = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.userId = verifyToken.userId;
    next();

  } catch (error) {
    console.log("isAuth error:", error);
    return res.status(500).json({
      message: error.message
    });
  }
};

export default isAuth;
