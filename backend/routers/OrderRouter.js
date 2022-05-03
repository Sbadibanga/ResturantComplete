
import express from "express";
import expressAsyncHandler from 'express-async-handler';
import { isAdmin, isAuth } from '../utlis';
import {Orderline, Address} from '../models';


const orderRouter = express.Router();
// route to place an order, ispaid and delivered are default 0(false)
orderRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
      const customerId = req.customer.id;
      const addresses = await Address.findOne({where: {CustomerId: customerId}})
      const addressId = addresses.id
      
      const createdOrder = ({
        totalPrice: req.body.totalPrice,
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        shippingPrice: req.body.shippingPrice,
        AddressId: addressId,
        CustomerId: customerId,
        isPaid: '0',
        isDelivered: '0'
      });
      const newOrder = await Orderline.create(createdOrder);
      res.status(201).send({ message: 'New Order Created', data: newOrder});
    })
);
// route to get all orders made by a specific customer
orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Orderline.findAll({ where: {CustomerId: req.customer.id}});
    res.send(orders);
  })
);

// Route to get all the orders ever made form admin dashboard
orderRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Orderline.findAll({customer: req.customer.id})
    res.send(orders);
  })
);
// Route to delete the orders made form admin dashboard
orderRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Orderline.findByPk(req.params.id);
    if (order) {
      const deletedOrder = await order.destroy();
      res.send({ message: 'Order Deleted', product: deletedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);
export default orderRouter;