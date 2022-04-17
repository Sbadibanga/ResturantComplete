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
    firstName ='',
    lastName = '',
    email = '',
    password ='',
    isAdmin = false
}) =>{
    localStorage.setItem(
        'customerInfo',
        JSON.stringify({
            id,
            firstName ,
            lastName ,
            email ,
            password ,
            isAdmin 
        })
    );
};

export const getCustomerInfo = () => {
    return localStorage.getItem('customerInfo')
    ? JSON.parse(localStorage.getItem('customerInfo'))
    : {firstName: '', lastName: '', email: '', password: ''};
};