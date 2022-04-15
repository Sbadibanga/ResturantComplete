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
// register customers


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
            id: Customers.id,
            firstname: Customers.firstName,
            lastname: Customers.lastName,
            email: Customers.email,
            isAdmin: Customers.isAdmin,
            token: generateToken(signinCustomer)
        });
    };
  
  })
  );
  
export default customerRouter;
