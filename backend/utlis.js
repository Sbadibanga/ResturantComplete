import jwt  from 'jsonwebtoken';
import config  from './config/configa';

export const generateToken = (customer) => jwt.sign(
      {
        id: customer.id,
        firstname: customer.firstname,
        lastname: customer.lastname,
        email: customer.email,
        isAdmin: customer.isAdmin
      },
      config.JWT_SECRET
    );