// config file to generate the secrect variable for the jwt token
import dotenv from 'dotenv';

dotenv.config();

export default {
  JWT_SECRET: process.env.JWT_SECRET,
};