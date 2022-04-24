import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
// import session from 'express-session';
import data from './data';
import customerRouter from './routers/customerRouter';
import addressRouter from './routers/addressRouter'

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/customers", customerRouter);
app.use("/api/address", addressRouter)

const db = require("./models");

app.get('/api/products', (req, res)=>{
  res.send(data.products)
})
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

db.sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server running on port http://localhost:5000');
  });
});

