/* eslint-disable object-shorthand */
import express from "express";
import expressAsyncHandler from 'express-async-handler';
import {Customers} from "../models";
import { generateToken } from "../utlis";


const customerRouter = express.Router();

customerRouter.get(
    '/createadmin', 
    expressAsyncHandler( async (req, res) =>{
    try{
      Customers.Customers.create({
      firstName: "siren",
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
    const { firstname, lastname, email, password } = req.body;
  
    const registerCustomer = await Customers.create({
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password
    })
  
    if (!registerCustomer) {
        res.status(401).send({
            message: "Invalid Customer data",
        });
    }else{
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
  
export default customerRouter;
