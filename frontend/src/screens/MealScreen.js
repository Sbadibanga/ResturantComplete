import { hideLoading, parseRequestURL, showLoading } from "../utils";
import { getProduct } from '../api';

const MealScreen = {
  
  after_render: () =>{
    const request = parseRequestURL();
    document.getElementById('add-button').addEventListener('click',()=>{
      document.location.hash =`/cart/${request.id}`;
    });
    document.getElementById('back-menu').addEventListener('click', ()=>{
      document.location.hash = '/'
    })
  },
  render: async() => {
    const request = parseRequestURL();
    showLoading();
    const product = await getProduct(request.id);
    if(product.error){
      return `<div>${product.error}</div>`;
    }
    hideLoading();
    return `
    <section class="menu-section">
    <div class="content">
      <div class="back-to-menu" id="back-menu">
      <a herf= "/"> Back to Menu </a>
      </div>
      <div class="content-d">
      <div class= "details">
        <div class="details-image">
        <img src="${product.image}" alt ="${product.name}"/>
        </div>
        <div class ="details-info">
          <ul>
            <li>
              <h3>${product.name}</h3>
            </li>
            <li>
              <h3>Price: </h3> <strong>£${product.price}</strong>
            </li>
            <li>
            <h3>Food Allergy:</h3>
              <div>
                ${product.descrip}
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="details-action">
        <ul>
          <li>
          <h3>Price:<h3> £${product.price}
            </li>
                <li>
                <h3>Status:<h3>
                  ${
                    product.countInStock > 0
                  ? `<span class="success"> In Stock </span>`
                  : `<span class="error"> Unavailable </span>`}
               </li>
              <li>
                <button id="add-button" class="primary btn btn-default">Add to Cart </div>
            </li>
         </ul>
        </div>
      </div>
    </div>
    </section>
    `;
  },

};

export default MealScreen;
