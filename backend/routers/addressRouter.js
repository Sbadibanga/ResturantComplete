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
    const customer = await Customers.findOne({where: {id: customerId }});
    const custAddress = await Address.findOne({where: {CustomerId: customerId, postcode: postcode, address: address}});
    const cAddress = await Address.findOne({where: {CustomerId: customerId}});

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
    }else if (cAddress){
        res.status(401).send({
            message: "To use new address, update.",
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
addressRouter.put(
    '/:id', isAuth,
    expressAsyncHandler( async (req, res) => {
    const {id} = req.params;
    const customer= await Address.findOne({where: {CustomerId: id}});

    if (!customer) {
        res.status(404).send({
            message: "Customer Not Found",
        });
    }else{
        customer.address = req.body.address || customer.address
        customer.postcode = req.body.postcode || customer.postcode
        customer.city = req.body.city || customer.city
        customer.country = req.body.country || customer.country
        const updatedAddress = await customer.save();
        res.send({
            id: updatedAddress.id,
            address: updatedAddress.address,
            postcode: updatedAddress.postcode,
            city: updatedAddress.city,
            country: updatedAddress.country,
        });
    };
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