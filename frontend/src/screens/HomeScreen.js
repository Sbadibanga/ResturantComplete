import axios from 'axios';
import { hideLoading, showLoading } from '../utils';

const HomeScreen = {
  render: async () => {
    showLoading();
    const response = await axios({
      url: 'http://localhost:5000/api/products',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    hideLoading();
    if (!response || response.statusText !== 'OK') {
      return `<div>Error in getting data</div>`;
    }
    const products = response.data;
    return `
    <section class="home-section" id="home">
        <div class="home-bg"></div>
        <div class="container">
          <div class="home-content row">
            <div class="home-text">
              <h1>At Home Restaurant</h1>
              <a href="#menu" class="btn btn-default">Order Now</a>
            </div>
          </div>
        </div>
    </section>
    <section class="about-section" id="about">
        <div class="container">
          <div class="row">
            <div class="section-title">
              <h2>About Us</h2>
            </div>
          </div>
          <div class="row">
            <div class="about-text">
              <h3>Welcome To AtHome</h3>
              <p>
                We specialise in good homemade food, and delivery it at yours.
                You can come through our resturant for a dine in away from home
                or you can order here and get it delivered at home. Regardless
                you will be at home.
              </p>
              <a href="#menu" class="btn btn-default">Check Our Menu</a>
            </div>
            <div class="about-img">
              <div class="img-box">
                <h3>15+ years of experience</h3>
                <img src="images/footer.jpg" alt="about img" />
              </div>
            </div>
          </div>
        </div>
    </section>
    <section class="menu-section" id="menu">
    <div class="container">
    <div class="menu-content">
      <div class="row">
      <div class="section-title">
        <h2>Our Menu</h2>
      </div>
      </div>
        <ul class="products">
            ${products.map(
              (product) => `
            <li>
                <div class="product">
                  <a href="/#/product/${product.id}">
                    <img src="${product.image}" alt="${product.name}" />
                  </a>
                  <div class="product-name">
                    <a href="/#/product/${product.id}"> ${product.name} </a>
                  </div>
                  <div class="product-price">£${product.price}</div>
                </div>
            </li>
            `,
          ).join('\n')}
        </ul>
    </section>
    <section class="about-section" id="resturant">
          <div class="container">
            <div class="row">
              <div class="section-title">
                <h2>Come See Us!</h2>
              </div>
            </div>
            <div class="row">
              <div class="about-text">
                <h3>Get In Touch</h3>
                <p>
                  Address: Leicester <br />
                  Phone: +44 123 456 789 Email:
                  <br />AtHome@yourresturant.com
                </p>
                <a href="#menu" class="btn btn-default">Check Out Menu</a>
              </div>
              <div class="ah-img">
                <img src="./images/AtHome.jpg" alt="athome-img" />
              </div>
            </div>
          </div>
        </section>
        `;
  },
};

export default HomeScreen;
