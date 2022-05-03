import express from 'express';
 import expressAysncHandler from 'express-async-handler';
 import { isAuth, isAdmin } from '../utlis';
 import Products from '../models';

 const productRouter = express.Router();
 productRouter.post(
   '/',
   isAuth,
   isAdmin,
   expressAysncHandler(async (req, res) => {
     Products.create({
       name: 'sample product',
       price: '00',
       descrip: 'sample descripto',
       image: '/images/product-1.jpg',
     });
     const createdProduct = await Products.save();
     if (createdProduct) {
       res
         .status(201)
         .send({ message: 'Product Created', product: createdProduct });
     } else {
       console.error();
       res.status(500).send({ message: 'Error in creating product' });
     }
   })
 );
 export default productRouter;