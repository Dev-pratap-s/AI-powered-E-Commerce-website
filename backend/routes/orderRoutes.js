import express from 'express'
import isAuth from '../middlewere/isAuth.js'
import adminAuth from '../middlewere/adminAuth.js'

import { allOrders, placeOrder, placeOrderRazorpay, updateStatus, userOrders, verifyRazorpay } from '../controller/orderController.js'


const orderRoutes = express.Router()


orderRoutes.post("/placeorder",isAuth,placeOrder)
orderRoutes.post("/userorder",isAuth,userOrders)
orderRoutes.post("/razorpay",isAuth,placeOrderRazorpay)
orderRoutes.post("/verifyrazorpay",isAuth,verifyRazorpay)


//for admin
orderRoutes.post("/list",adminAuth,allOrders)
orderRoutes.post("/status",adminAuth,updateStatus)






export default orderRoutes