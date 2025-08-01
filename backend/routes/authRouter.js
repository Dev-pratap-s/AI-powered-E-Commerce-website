import express from 'express';
import { Registration,login, logout, googleLogin, adminLogin } from '../controller/authController.js';

const authRouter = express.Router();
authRouter.post('/registration', Registration);
authRouter.post("/login",login)
authRouter.get("/logout",logout)
authRouter.post("/googlelogin",googleLogin)
authRouter.post("/adminlogin",adminLogin)





export default authRouter;
