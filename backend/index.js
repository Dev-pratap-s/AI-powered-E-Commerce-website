import express from 'express';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';


const port = process.env.PORT || 8000;
// ✅ sabse pehle dotenv config
dotenv.config();

const app = express();

// ✅ Other middlewares
app.use(cookieParser());
app.use(express.json());

// ✅ CORS middleware (no space in origin URL)
app.use(cors({
  origin: ["https://ai-powered-e-commerce-website-frontend-50u5.onrender.com", "https://admin-24sw.onrender.com"],
  credentials: true
}));

console.log("✅ Routes are being registered...");

// ✅ Routes
import authRouter from './routes/authRouter.js';
import userRouter  from './routes/userRoute.js';
import productRoutes from './routes/productRouter.js';
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js';

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRoutes);
app.use("/api/cart",cartRoutes)
app.use("/api/order", orderRoutes)






// ✅ DB connect + server start
app.listen(port,()=>{
  console.log("hello from server")
  connectDB();
  
})
