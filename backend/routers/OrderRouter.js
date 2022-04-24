import express from "express";
import expressAsyncHandler from 'express-async-handler';
import { isAuth } from '../utlis';
import {Orderline} from '../models/Orderline';


const orderRouter = express.Router();

orderRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const createdOrder = ({
        payment: req.body.payment,
        totalPrice: req.body.totalPrice,
        taxPrice: req.body.taxPrice,
        shippingPrice: req.body.shippingPrice,
        customer: req.Customers.id,
        shipping: req.Address.id
      });
      Orderline.create(createdOrder);
      res.status(201).send({ message: 'New Order Created', data: createdOrder});
    })
);
export default orderRouter;