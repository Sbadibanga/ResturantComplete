import axios from 'axios';
import { apiUrl } from "./config";
import { getCustomerInfo } from './localStorage';

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