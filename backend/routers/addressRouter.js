/* eslint-disable object-shorthand */
import express from "express";
import expressAsyncHandler from 'express-async-handler';
import {Address, Customers} from '../models';
import {isAuth } from "../utlis";

const addressRouter = express.Router();

addressRouter.post(
    '/:id', isAuth,
    expressAsyncHandler( async (req, res) => {
    const  {address, postcode, city, country} = req.body;
    const customerId = req.customer.id;
    const customer = await Customers.findOne({where: {id: customerId }})
    const custAddress = await Address.findOne({where: {CustomerId: customerId}})

    if (!customer) {
        res.status(401).send({
            message: "Customer Not Found",
        });
    }else if (custAddress){
        res.status(401).send({
            message: "Address already created",
        });
    }else{
        Address.create({
            address: address,
            postcode: postcode,
            city: city,
            country: country,
            CustomerId: customerId
        });
        res.send({
            address: address,
            postcode: postcode,
            city: city,
            country: country
        })
    }
})

    
);

export default addressRouter;

/* else if(custAddress){
    res.status(401).send({
        message: "Address already exist",
    });
} */