/* eslint-disable object-shorthand */
import express from "express";
import expressAsyncHandler from 'express-async-handler';
import {Customers} from "../models";
import { generateToken, isAuth } from "../utlis";


const customerRouter = express.Router();

customerRouter.get(
    '/createadmin', 
    expressAsyncHandler( async (req, res) =>{
    try{
      Customers.create({
      firstName: "Siren",
      lastName: "Ocean",
      email: "sireno@gmail.com",
      password: "password",
      isAdmin: "1"
     }).then(createAdmin => res.send(createAdmin)) 
    }catch(err){
        res.status(500).send({message: err.message});
    }
}));


// login customers
customerRouter.post(
    '/signin', 
    expressAsyncHandler( async (req, res) => {
    const { email, password } = req.body;
  
    const signinCustomer = await Customers.findOne({ where: { email, password } });
  
    if (!signinCustomer) {
        res.status(401).send({
            message: "Invalid email or password",
        });
    }else{
        res.send({
            id: signinCustomer.id,
            firstname: signinCustomer.firstName,
            lastname: signinCustomer.lastName,
            email: signinCustomer.email,
            isAdmin: signinCustomer.isAdmin,
            token: generateToken(signinCustomer)
        });
    };
  
  })
);

// register customers
customerRouter.post(
    '/register', 
    expressAsyncHandler( async (req, res) => {
    const {email} = req.body;
    
    const customerEmail = await Customers.findOne({where: {email} });

    const registerCustomer = {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
    }
  
    if (customerEmail) {
        res.status(401).send({
            message: "Email already exists",
        });
    }else if(!customerEmail){
        Customers.create(registerCustomer);
        res.send({
            id: registerCustomer.id,
            firstname: registerCustomer.firstName,
            lastname: registerCustomer.lastName,
            email: registerCustomer.email,
            isAdmin: registerCustomer.isAdmin,
            token: generateToken(registerCustomer)
        });
    };
  
  })
  );

customerRouter.put(
    '/:id', isAuth,
    expressAsyncHandler( async (req, res) => {
    const {id} = req.params;
    const customer = await Customers.findOne({where: {id: id}});

    if (!customer) {
        res.status(401).send({
            message: "Customer Not Found",
        });
    }else{
        customer.firstName = req.body.firstname || customer.firstName
        customer.lastName = req.body.lastname || customer.lastName
        customer.email = req.body.email || customer.email
        customer.password = req.body.password || customer.password
        const updatedCustomer = await customer.save();
        res.send({
            id: updatedCustomer.id,
            firstname: updatedCustomer.firstName,
            lastname: updatedCustomer.lastName,
            email: updatedCustomer.email,
            isAdmin: updatedCustomer.isAdmin,
            token: generateToken(updatedCustomer)
        });
    };
})
);
  
  
export default customerRouter;
