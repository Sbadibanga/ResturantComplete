import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import data from './data';
import customerRouter from './routers/customerRouter';
import addressRouter from './routers/addressRouter';
import orderRouter from './routers/OrderRouter';
import productRouter from './routers/productRouter';
// use packages and retrive models
const db = require("./models");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/customers", customerRouter);
app.use("/api/address", addressRouter);
app.use("/api/orders", orderRouter);
app.use('/api/product', productRouter);



// retrieve products on the server side
app.get('/api/products', (req, res)=>{
  res.send(data.products)
})
// retrieve product by id from data.js
app.get('/api/products/:id', (req, res) =>{
  const product = data.products.find((x) => x.id === req.params.id);
  if(product){
    res.send(product);
  }else{
    res.status(404).send({message: 'Product Not Found!'});
  }
})

app.use((err, req, res, next)=>{
  const status = err.name && err.name === 'ValidationError' ? 400 : 500;
  res.status(status).send({message: err.message});
})
// port the backend server is running on
db.sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server running on port http://localhost:5000');
  });
});

