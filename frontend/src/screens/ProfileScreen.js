import {getMyOrders, update, updateAdd} from "../api";
import { getCustomerInfo, setCustomerInfo, clearCustomer, getShipping, setShipping} from "../localStorage";
import { hideLoading, showLoading, showMessage } from "../utils";

// rerender profile scren after updates
const ProfileScreen = {
    after_render: () =>{
        document.getElementById("signout-button").addEventListener("click", () =>{
            clearCustomer();
            document.location.hash = "/";
        })
        document.getElementById('profile-form').addEventListener
        ('submit', async (e) => {
            e.preventDefault();
            showLoading();
            const data = await update({
                firstname: document.getElementById('firstname').value,
                lastname: document.getElementById('lastname').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            });
            hideLoading();
            if(data.error){
                showMessage(data.error);
            }else{
                setCustomerInfo(data)
                document.location.hash = "/";
            }
        });
        document.getElementById('address-form').addEventListener
        ('submit', async (e) => {
            e.preventDefault();
            showLoading();
            const data = await updateAdd({
                address: document.getElementById('address').value,
                postcode: document.getElementById('postcode').value,
                city: document.getElementById('city').value,
                country: document.getElementById('country').value,
            });
            hideLoading();
            if(data.error){
                showMessage(data.error);
            }else{
                setShipping(data)
                document.location.hash = "/";
            }
        });
    },
    // profile screen with customer info, address and orders
    render: async () => {
        const {firstname,lastname, email} = getCustomerInfo();
        const {address, postcode, city, country} = getShipping();
        const orders = await getMyOrders();
        if(!firstname){
            document.location.hash = '/';
        }
        return `
        <section class="menu-section">
        <div class="profile">
            <div class="profile-info">
                <div class="form-containerp">
                <form id="profile-form">
                    <ul class="form-itemsp">
                        <li>
                        <h1>Profile</h1>
                        </li>
                        <li>
                        <label for="firstname"> First Name :</label>
                        <input type="name" name="firstname" id="firstname" value="${firstname}"/>
                        </li>
                        <li>
                        <label for="lastname"> Last Name :</label>
                        <input type="name" name="lastname" id="lastname" value="${lastname}"/>
                        </li>
                        <li>
                            <label for="email"> Email :</label>
                            <input type="email" name="email" id="email" value="${email}"/>
                        </li>
                        <li>
                            <label for="password">Password : </label>
                            <input type="password" name="password" id="password"/>
                        </li>
                        <li>
                            <button type="submit" class="btn btn-default">Update</button>
                        </li>
                        <li>
                        <button type="button" id="signout-button" class="btn btn-default sign-out">Sign Out</button>
                        </li>
                    </ul>
                </form>
                <form id="address-form">
                    <ul class="form-itemsp">
                        <li>
                        <h1>Address</h1>
                        </li>
                        <li>
                        <label for="address"> Address :</label>
                        <input type="text" name="address" id="address" value="${address}"/>
                        </li>
                        <li>
                        <label for="postcode"> Postcode :</label>
                        <input type="text" name="postcode" id="postcode" value="${postcode}"/>
                        </li>
                        <li>
                            <label for="city"> City :</label>
                            <input type="text" name="email" id="city" value="${city}"/>
                        </li>
                        <li>
                            <label for="country"> Country : </label>
                            <input type="text" name="country" id="country" value="${country}"/>
                        </li>
                        <li>
                            <button type="submit" class="btn btn-default">Update</button>
                        </li>
                    </ul>
                </form> 
            </div>
            </div>
            <div class="profile-orders">
            <h2>Order History</h2>
            <table>
            <thead>
                <tr>
                <th>Items Price </th>
                <th>DATE </th>
                <th>TOTAL </th>
                <th>PAID </th>
                <th>DELIVERED </th>
                </tr>
            </thead>
            <tbody>
            ${
                orders.length === 0
                  ? `<tr><td colspan="6">No Order Found.</tr>`
                  : orders.map(
                        (order) => `
            <tr>
              <td>${order.itemsPrice}</td>
              <td>${order.createdAt}</td>
              <td>${order.totalPrice}</td>
              <td>${order.isPaid || 'No'}</td>
              <td>${order.isDelivered || 'No'}</td>
            </tr>
            `
                      )
                      .join('\n')
              }
            </tbody>
          </table>
            </div>
        </div>
        </section>
        `;
    },
};

export default ProfileScreen;