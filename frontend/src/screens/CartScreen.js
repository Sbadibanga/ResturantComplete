/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
import {parseRequestURL, redirectCustomer, rerender} from "../utils";
import {getProduct} from '../api'
import { getCartItems, getCustomerInfo, setCartItems } from "../localStorage";

// function to add items to cart
const addToCart = (item, forceUpdate = false) =>{
    let cartItems = getCartItems();
    const existItem = cartItems.find(x => x.product === item.product);
    if (existItem) {
        if(forceUpdate){
            cartItems = cartItems.map((x) => x.product === existItem.product ? item: x);
        }
    } else{
        cartItems = [...cartItems, item];
    }
    setCartItems(cartItems);
    if (forceUpdate){
        rerender(CartScreen);
    }
};
// function to remove items to cart
const removeFromCart = (id) =>{
    setCartItems(getCartItems().filter(x => x.product !== id));
    if(id === parseRequestURL().id){
        document.location.hash = '/cart';
    }else{
        rerender(CartScreen);
    }
}
// cart screen
const CartScreen = {
    // after render method to redirect to the shipping/sigin depending on if customer is logged in
    after_render: () => {
        const qtySelects = document.getElementsByClassName("qty-select");
        Array.from(qtySelects).forEach(qtySelect =>{
            qtySelect.addEventListener('change', (e) =>{
                const item = getCartItems().find(x => x.product === qtySelect.id);
                addToCart({...item, qty: Number(e.target.value)}, true);
            });
        });
        const deleteBtns = document.getElementsByClassName('delete-button');
        Array.from(deleteBtns).forEach((deleteBtns)=>{
            deleteBtns.addEventListener('click', () =>{
                removeFromCart(deleteBtns.id);
            });
        });
        document.getElementById("checkout-button").addEventListener('click', () =>{
            const {firstname} = getCustomerInfo();
            if(!firstname){
                document.location.hash = '/signin';
            }else{
                redirectCustomer()
            }
            
        } )
    },
    // cart screen rendered with item details
    render: async() =>{
        const request = parseRequestURL();
        if(request.id){
            const product = await getProduct(request.id);
            addToCart({
                product: product.id,
                name: product.name,
                image: product.image,
                price: product.price,
                countInStock: product.countInStock,
                qty: 1,
            });
        }
        const cartItems = getCartItems();
        return `
        <section class="menu-section">
        <div class="cart">
            <div class="cart-list">
                <ul class="cart-list-container">
                    <li>
                        <h3>Shopping Cart</h3>
                        <div>Price</div>
                    </li>
                    ${
                        cartItems.length === 0?
                        '<div> Cart is empty. <a href="/#/">Buy Some Food</a>':
                        cartItems.map(item =>`
                        <li>
                            <div class="cart-image">
                                <img src="${item.image}" alt="${item.name}"/>
                            </div>
                            <div class="cart-name">
                                <div>
                                    <a herf="/#/product/${item.product}">
                                        ${item.name}
                                    </a>
                                </div>
                            </div>
                            <div>
                            Qty: <select class="qty-select" id="${item.product}">
                            ${
                                [...Array(item.countInStock).keys()].map(x => item.qty === x+1
                                   ? `<option selected value="${x+1}">${x+1}</option>`
                                   :`<option value="${x+1}">${x+1}</option>`

                                )}
                            </select>
                            <button type="button" class="delete-button btn btn-default" id="${item.product}">
                                Delete
                            </button>
                            </div>
                            <div class="cart-price">
                                £${item.price}
                            </div>
                        </li>
                        `).join('\n')
                    }
                </ul>
            </div>
            <div class="cart-action">
                    <h3>
                        Subtotal (${cartItems.reduce((a,c) => a + c.qty, 0)} Items)
                        :
                        £${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                    </h3>
                    <button id="checkout-button" class="btn btn-default fw">
                        Proceed to Checkout
                    </button>
            </div>
        </div>
        </section>
        `;
    },

};
export default CartScreen;