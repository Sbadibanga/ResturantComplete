
import express from "express";
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../utlis';
import {Orderline, Address} from '../models';


const orderRouter = express.Router();

orderRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const customerId = req.customer.id;
      const addresss = Address.findOne({where: {CustomerId: customerId}})
      const addressId = addresss.id
      
      const createdOrder = ({
        totalPrice: req.body.totalPrice,
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        shippingPrice: req.body.shippingPrice,
        AddressId: addressId,
        CustomerId: customerId
      });
      Orderline.create(createdOrder);
      res.status(201).send({ message: 'New Order Created', data: createdOrder});
    })
);
export default orderRouter;