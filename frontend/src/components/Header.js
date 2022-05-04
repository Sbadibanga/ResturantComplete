// header/nav that alters depending on signin, and admin
import { getCustomerInfo } from '../localStorage';

 const Header = {
   render: () => {
     const { firstname, isAdmin} = getCustomerInfo();
     return ` 
     <div class="container">
     <nav>
       <div class="Rlogo"><h4>At Home</h4></div>
       
       <ul class="nav-links">
         <li><a href="/#home">Home</a></li>
         <li><a href="/#about">About Us</a></li>
         <li><a href="/#menu">Menu</a></li>
         <li><a href="/#resturant">Resturant</a></li>
         ${ 
          firstname
          ? `<li><a href="/#/profile">${firstname}</a></li>`
          : `<li><a href="/#/signin">Sign-In</a></li>`
          }
         <li><a href="/#/cart">Cart</a></li>
        ${isAdmin?`<li><a href="/#/dashboard"> Dashboard</a></li>`: ''}
       </ul>
       <div class="burger">
         <div class="line1"></div>
         <div class="line2"></div>
         <div class="line3"></div>
       </div>
     </nav>
     </div>
     `;
   },
   after_render: () => {},
 };

export default Header;