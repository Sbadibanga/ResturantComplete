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
    const custAddress = await Address.findOne({where: {CustomerId: customerId, postcode: postcode, address: address}})

    if (!customer) {
        res.status(401).send({
            message: "Customer Not Found",
        });
    }else if (custAddress){
        res.status(401).send({
            message: "Address already registered",
        });
        res.send({
            address: address,
            postcode: postcode,
            city: city,
            country: country
        })
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
} 
customerRouter.post(
    '/signin', 
    expressAsyncHandler( async (req, res) => {
    const { email, password } = req.body;
  
    const signinCustomer = await Customers.findOne({ where: { email} });
  
    if (!signinCustomer) res.status(401).send({
            message: "Invalid email or password",
        });
    
    bcrypt.compare(password, signinCustomer.password).then(async (match) =>{
        if (!match) res.send({message: "Wrong email and password combo"});
        res.send({
            id: signinCustomer.id,
            firstname: signinCustomer.firstName,
            lastname: signinCustomer.lastName,
            email: signinCustomer.email,
            isAdmin: signinCustomer.isAdmin,
            token: generateToken(signinCustomer)
        });
    });
  
  })
); */