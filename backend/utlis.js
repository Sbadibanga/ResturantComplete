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