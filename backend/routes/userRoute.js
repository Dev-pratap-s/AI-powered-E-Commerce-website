import express from "express";
import isAuth from "../middlewere/isAuth.js";
import { getAdmin, getCurrentUser } from "../controller/userController.js";
import adminAuth from "../middlewere/adminAuth.js";

const userRouter = express.Router();

userRouter.get("/getcurrentuser", isAuth, getCurrentUser);
userRouter.get("/getadmin", adminAuth, getAdmin);


export default userRouter;
