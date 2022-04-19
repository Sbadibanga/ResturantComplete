/* eslint-disable spaced-comment */
import { signin } from "../api";
import { showLoading, hideLoading, showMessage } from '../utils';
import { getCustomerInfo, setCustomerInfo} from "../localStorage";


const SigninScreen = {
    //after_render function
    after_render: () =>{
        document.getElementById('signin-form').addEventListener
        ('submit', async (e) => {
            e.preventDefault();
            showLoading();
            const data = await signin({
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            });
            hideLoading();
            if(data.error){
                showMessage(data.error);
            }else{
                setCustomerInfo(data);
                document.location.hash ='/';
            }
        })
    },
    //render function which returns signin form
    render: () => {
        if(getCustomerInfo().firstName){
            document.location.hash = '/';
        }
        return `
        <section class="menu-section">
        <div class="form-container">
            <form id="signin-form">
                <ul class="form-items">
                    <li>
                    <h1>Sign-In</h1>
                    </li>
                    <li>
                        <label for="email"> Email :</label>
                        <input type="email" name="email" id="email"/>
                    </li>
                    <li>
                        <label for="password">Password : </label>
                        <input type="password" name="password" id="password"/>
                    </li>
                    <li>
                        <button type="submit" class="btn btn-default">Sign In!</button>
                    </li>
                    <li>
                        <div>
                            New Customer?
                            <a href="/#/register"> Create Your Account </a>
                        </div>
                    </li>
                </ul>
            </form>
        </div>
        </section>
        `;
    },
};

export default SigninScreen;