import DashboardMenu from '../components/DashboardMenu';
 import { getProducts, createProduct} from '../api';

 // list of all products for admin users
 const ProductListScreen = {
   after_render: () => {
    
   },
   render: async () => {
     const products = await getProducts();
     return `
     <section class="menu-section">
     <div class="dashboard">
     ${DashboardMenu.render({ selected: 'products' })}
     <div class="dashboard-content">
       <h1>Products</h1>
       <button id="create-product-button" class="btn btn-default">
         Create Product
       </button>
       <div class="product-list">
         <table>
           <thead>
             <tr>
               <th>Id</th>
               <th>Name</th>
               <th>Price</th>
               <th>Descrip</th>
               <th class="tr-action">ACTION</th>
             <tr>
           </thead>
           <tbody>
             ${products
               .map(
                 (product) => `
             <tr>
               <td>${product.id}</td>
               <td>${product.name}</td>
               <td>${product.price}</td>
               <td>${product.descrip}</td>
               <td>
               <button id="${product.id}" class="edit-button btn btn-default">Edit</button>
               <button id="${product.id}" class="delete-button btn btn-default">Delete</button>
               </td>
             </tr>
             `
               )
               .join('\n')}
           </tbody>
         </table>
       </div>
     </div>
   </div>
   </section>
     `;
   },
 };
 export default ProductListScreen;