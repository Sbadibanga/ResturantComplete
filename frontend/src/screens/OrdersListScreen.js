import DashboardMenu from '../components/DashboardMenu';
import { getOrders } from '../api';

 const orderListScreen = {
   after_render: () => {
    
   },
   render: async () => {
     const orders = await getOrders();
     console.log(orders)
     return `
     <section class="menu-section">
     <div class="dashboard">
     ${DashboardMenu.render({ selected: 'orders' })}
     <div class="dashboard-content">
       <h1>orders</h1>
       <div class="order-list">
         <table>
           <thead>
             <tr>
                <th>Customer Id</th>
               <th>Total Price</th>
               <th>Items Price</th>
               <th>Date</th>
               <th>Paid?</th>
               <th>Delivered?</th>
               <th class="tr-action">ACTION</th>
             <tr>
           </thead>
           <tbody>
             ${orders
               .map(
                 (order) => `
             <tr>
              <td>${order.CustomerId}</td>
               <td>${order.totalPrice}</td>
               <td>${order.itemsPrice}</td>
               <td>${order.createdAt}</td>
               <td>${order.isPaid}</td>
               <td>${order.isDelivered}</td>
               <td>
               <button id="${order.id}" class="edit-button btn btn-default">Edit</button>
               <button id="${order.id}" class="delete-button btn btn-default">Delete</button>
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
 export default orderListScreen;