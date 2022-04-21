import {update } from "../api";
import { getCustomerInfo, setCustomerInfo, clearCustomer} from "../localStorage";
import { hideLoading, showLoading, showMessage } from "../utils";


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
                document.location.hash ='/';
            }
        });
    },
    render: () => {
        const {firstname,lastname, email} = getCustomerInfo();
        if(!firstname){
            document.location.hash = '/';
        }
        return `
        <section class="menu-section">
        <div class="form-container">
            <form id="profile-form">
                <ul class="form-items">
                    <li>
                    <h1>Customer Profile</h1>
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
                        <button type="button" id="signout-button" class="btn btn-default">Sign Out</button>
                    </li>
                </ul>
            </form>
        </div>
        </section>
        `;
    },
};

export default ProfileScreen;