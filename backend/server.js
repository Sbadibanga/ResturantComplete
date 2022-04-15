import express from 'express';
import cors from 'cors';
import data from './data';


const app = express();
app.use(cors())

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
// Routers
// const customerRouter = require("./Routes/Customers");

// app.use("/customers", customerRouter);

db.sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server running on port http://localhost:5000');
  });
});

