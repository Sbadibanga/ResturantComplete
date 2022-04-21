/* eslint-disable arrow-body-style */


export const getCartItems = () =>{
    const cartItems = localStorage.getItem('cartItems')?
    JSON.parse(localStorage.getItem('cartItems'))
    :[];
    return cartItems;
}
export const setCartItems = (cartItems) =>{
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

export const setCustomerInfo = ({
    id = '',
    firstname ='',
    lastname = '',
    email = '',
    password ='',
    token = '',
    isAdmin = false
}) =>{
    localStorage.setItem(
        'customerInfo',
        JSON.stringify({
            id,
            firstname ,
            lastname ,
            email ,
            password ,
            token,
            isAdmin 
        })
    );
};
export const clearCustomer = () =>{
    localStorage.removeItem('customerInfo')
}
export const getCustomerInfo = () => {
    return localStorage.getItem('customerInfo')
    ? JSON.parse(localStorage.getItem('customerInfo'))
    : {firstName: '', email: '', password: ''};
};