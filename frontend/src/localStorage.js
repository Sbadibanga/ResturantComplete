/* eslint-disable arrow-body-style */
// local storage

// get all items in cart
export const getCartItems = () =>{
    const cartItems = localStorage.getItem('cartItems')?
    JSON.parse(localStorage.getItem('cartItems'))
    :[];
    return cartItems;
}
// set all items in cart
export const setCartItems = (cartItems) =>{
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
};
// set customer info
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
// clear customer info
export const clearCustomer = () =>{
    localStorage.removeItem('customerInfo')
}
// get customer info
export const getCustomerInfo = () => {
    return localStorage.getItem('customerInfo')
    ? JSON.parse(localStorage.getItem('customerInfo'))
    : {firstName: '', email: '', password: ''};
};
// get shipping info
export const getShipping = () => {
    return localStorage.getItem('shippingInfo')
    ? JSON.parse(localStorage.getItem('shippingInfo'))
    : {
        address: '',
        city: '',
        postcode: '',
        country: ''
    };
};

// set shipping info
export const setShipping = ({
    id = '',
    address = '',
    city = '',
    postcode = '',
    country = '',
    customerId = ''
}) => {
    localStorage.setItem('shippingInfo', JSON.stringify({id,address, city, postcode, country, customerId})
    );
};
// get payment info
export const getPayment = () => {
    const payment = localStorage.getItem('payment')
    ? JSON.parse(localStorage.getItem('payment'))
    : {
      paymentMethod: 'paypal'
    };
    return payment
};
// set payment info
export const setPayment = ({
    paymentMethod = 'paypal'
}) => {
    localStorage.setItem('payment', JSON.stringify({paymentMethod})
    );
};
// clear cart
export const cleanCart = () => {
    localStorage.removeItem('cartItems');
  };