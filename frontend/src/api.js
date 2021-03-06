import axios from 'axios';
import { apiUrl } from "./config";
import { getCustomerInfo } from './localStorage';

// function to get a product
export const getProduct = async (id) =>{
    try{
        const response = await axios({
            url: `${apiUrl}/api/products/${id}`,
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
            },
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    }catch(err){
        console.log(err);
        return{ error: err.response.data.message || err.message};
    }

};
// function to get products
export const getProducts = async () => {
    try {
      const response = await axios({
        url: `${apiUrl}/api/products/`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (err) {
      console.log(err);
      return { error: err.response.data.message || err.message };
    }
};
// function to create a product
export const createProduct = async () => {
    try {
      const { token } = getCustomerInfo();
      const response = await axios({
        url: `${apiUrl}/api/products`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.statusText !== 'Created') {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (err) {
      return { error: err.response.data.message || err.message };
    }
};
// function to signin
export const signin = async({email, password}) => {
    try{
        const response = await axios({
            url: `${apiUrl}/api/customers/signin`,
            method: 'POST',
            header: {
                'Content-Type' : 'application/json',
            },
            data:{
                email,
                password,
            },
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    }catch(err){
        console.log(err);
        return {error: err.response.data.message || err.message};
    }
};
// function to register 
export const register = async({firstname, lastname,email, password}) => {
    try{
        const response = await axios({
            url: `${apiUrl}/api/customers/register`,
            method: 'POST',
            header: {
                'Content-Type' : 'application/json',
            },
            data:{
                firstname,
                lastname,
                email,
                password,
            },
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    }catch(err){
        console.log(err);
        return {error: err.response.data.message || err.message};
    }
};
// function to update customer info
export const update = async({firstname, lastname,email, password}) => {
    try{
        const {id, token} = getCustomerInfo();
        const response = await axios({
            url: `${apiUrl}/api/customers/${id}`,
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${token}`,
            },
            data:{
                firstname,
                lastname,
                email,
                password,
            },
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    }catch(err){
        console.log(err);
        return {error: err.response.data.message || err.message};
    }
};
// function to update address
export const updateAdd = async({address, postcode,city, country}) => {
    try{
        const {id, token} = getCustomerInfo();
        const response = await axios({
            url: `${apiUrl}/api/address/${id}`,
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${token}`,
            },
            data:{
                address,
                postcode,
                city,
                country,
            },
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    }catch(err){
        console.log(err);
        return {error: err.response.data.message || err.message};
    }
};
// function to create address
export const shipping = async({address, city, postcode, country}) => {
    try{
        const {id,token} = getCustomerInfo();
        const response = await axios({
            url: `${apiUrl}/api/address/${id}`,
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${token}`,
            },
            data:{
                address,
                city,
                postcode,
                country
            },
        });
        if(response.statusText !== 'OK'){
            throw new Error(response.data.message);
        }
        return response.data;
    }catch(err){
        console.log(err);
        return {error: err.response.data.message || err.message};
    }
};
// function to create order
export const createOrder = async (order) => {
    try {
      const { token } = getCustomerInfo();
      const response = await axios({
        url: `${apiUrl}/api/orders`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: order,
      });
      if (response.statusText !== 'Created') {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (err) {
      return { error: err.response ? err.response.data.message : err.message };
    }
};
// function to get sepcific customer orders
export const getMyOrders = async () => {
    try {
      const { token } = getCustomerInfo();
      const response = await axios({
        url: `${apiUrl}/api/orders/mine`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (err) {
      return { error: err.response ? err.response.data.message : err.message };
    }
};
// function to all orders on admin side
export const getOrders = async () => {
    try {
      const { token } = getCustomerInfo();
      const response = await axios({
        url: `${apiUrl}/api/orders`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (err) {
      console.log(err);
      return { error: err.response.data.message || err.message };
    }
};
// function to delete orders admin side
export const deleteOrder = async (orderId) => {
  try {
    const { token } = getCustomerInfo();
    const response = await axios({
      url: `${apiUrl}/api/orders/${orderId}`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.statusText !== 'OK') {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (err) {
    return { error: err.response.data.message || err.message };
  }
};