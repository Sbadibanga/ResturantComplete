/* eslint-disable no-restricted-globals */
import DashboardMenu from '../components/DashboardMenu';
import { showLoading, hideLoading, rerender, showMessage } from '../utils';
import { getOrders, deleteOrder} from '../api';

 const orderListScreen = {
   // after deleting an order rerenders ordlistscreen
   after_render: () => {
    const deleteButtons = document.getElementsByClassName('delete-button');
    Array.from(deleteButtons).forEach((deleteButton) => {
      deleteButton.addEventListener('click', async () => {
        if (confirm('Are you sure you want to delete this order?')) {
          showLoading();
          const data = await deleteOrder(deleteButton.id);
          if (data.error) {
            showMessage(data.error);
          } else {
            rerender(orderListScreen);
          }
          hideLoading();
        }
      });
    });
   },
   // admin orderlist screen only visiable to admin with orders ever made details
   render: async () => {
     const orders = await getOrders();
     console.log(orders)
     return `
     <section class="menu-section">
     <div class="dashboard">
     ${DashboardMenu.render({ selected: 'orders' })}
     <div class="dashboard-content">
       <h1>Orders</h1>
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