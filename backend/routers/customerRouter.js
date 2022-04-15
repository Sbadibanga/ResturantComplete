import express from "express";
import {Customers} from "../models/Customers"


const customerRouter = express.Router();

customerRouter.get('/createadmin', async (req, res) =>{
    res.send("hello baby")
});
export default customerRouter;
