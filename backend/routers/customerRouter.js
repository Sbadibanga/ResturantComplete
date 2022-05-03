/* eslint-disable object-shorthand */
import express from "express";
import bcrypt from 'bcrypt';
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
// login customers
// login customers
customerRouter.post(
    '/signin', 
    expressAsyncHandler( async (req, res) => {
    const { email, password } = req.body;
  
    const signinCustomer = await Customers.findOne({ where: { email} });
  
    if (!signinCustomer) {
        res.status(401).send({
            message: "Invalid email or password",
        });
    }else{
        bcrypt.compare(password, signinCustomer.password).then(async (match) =>{
            if(!match) res.send({error: "wrong email and password combo"});
        })
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
    const {firstname,lastname,password,email} = req.body;
    const customerEmail = await Customers.findOne({where: {email} });
    
    if (customerEmail) {
        res.status(401).send({
            message: "Email already exists",
        });
    }
    else if(!customerEmail){

        bcrypt.hash(password, 10).then((hash)=>{
        Customers.create({
            firstName: firstname,
            lastName: lastname,
            email: email,
            password: hash
            });
        });
  
        res.send({
            id: Customers.id,
            firstname: Customers.firstName,
            lastname: Customers.lastName,
            email: Customers.email,
            isAdmin: Customers.isAdmin,
            token: generateToken(Customers)
        });
    };
  
  })
  );

customerRouter.put(
    '/:id', isAuth,
    expressAsyncHandler( async (req, res) => {
    const {id} = req.params;
    const customer = await Customers.findOne({where: {id: id}});
    const {firstname,lastname,password,email} = req.body;

    if (!customer) {
        res.status(401).send({
            message: "Customer Not Found",
        });
    }else{
        await bcrypt.hash(password,10).then((hash)=>{
            customer.firstName = firstname || customer.firstName
            customer.lastName = lastname || customer.lastName
            customer.email = email || customer.email
            customer.password = hash || customer.password
        })
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
