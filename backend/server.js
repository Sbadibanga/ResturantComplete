import express from 'express';
import cors from 'cors';
import data from './data';
import customerRouter from './routers/customerRouter'

const app = express();
app.use(cors())
app.use("/api/customers", customerRouter);

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



db.sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server running on port http://localhost:5000');
  });
});

