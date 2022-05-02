/* eslint-disable arrow-body-style */
import jwt  from 'jsonwebtoken';
import config  from './config/configa';

export const generateToken = (customer) => {
    return jwt.sign(
      {
        id: customer.id,
        firstname: customer.firstName,
        lastname: customer.lastName,
        email: customer.email,
        isAdmin: customer.isAdmin
      },
      config.JWT_SECRET
    );
};

// function to check if the user is an authorizaed user
export const isAuth = (req, res, next) =>{
  const bearerToken = req.headers.authorization;
  if(!bearerToken){
    res.status(401).send({message: 'Token is not supplied'});
  }else{
    const token = bearerToken.slice(7,bearerToken.length);
    jwt.verify(token, config.JWT_SECRET, (err, data) =>{
      if(err){
        res.status(401).send({message: 'Invalid Token'});
      }else{
        req.customer = data;
        next();
      }
    })
  }
}