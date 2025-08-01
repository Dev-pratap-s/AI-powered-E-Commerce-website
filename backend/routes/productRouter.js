import express from 'express'
import { addProduct, listProduct, removeProduct} from '../controller/productController.js'
import upload from '../middlewere/multer.js'
import adminAuth from '../middlewere/adminAuth.js'


let productRoutes = express.Router()

productRoutes.post("/addproduct",upload.fields([
    {name:"image1",maxCount:1},
    {name:"image2",maxCount:1},
    {name:"image3",maxCount:1},
    {name:"image4",maxCount:1}]),addProduct)
productRoutes.get("/list",listProduct)
productRoutes.post("/remove/:id",adminAuth,removeProduct)




export default productRoutes