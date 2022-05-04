import { register } from "../api";
import { getCustomerInfo, setCustomerInfo} from "../localStorage";
import { hideLoading, redirectCustomer, showLoading, showMessage } from "../utils";


const RegisterScreen = {
    // redirects to homepage
    after_render: () =>{
        document.getElementById('register-form').addEventListener
        ('submit', async (e) => {
            e.preventDefault();
            showLoading();
            const data = await register({
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
                document.location.hash = '/';
            }
        });
    },
    // register screen
    render: () => {
        if(getCustomerInfo().firstName){
            redirectCustomer();
        }
        return `
        <section class="menu-section">
        <div class="form-container">
            <form id="register-form">
                <ul class="form-items">
                    <li>
                    <h1>Register!</h1>
                    </li>
                    <li>
                    <label for="firstname"> First Name :</label>
                    <input type="name" name="firstname" id="firstname"/>
                    </li>
                    <li>
                    <label for="lastname"> Last Name :</label>
                    <input type="name" name="lastname" id="lastname"/>
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
                        <label for="repassword">Re-Enter Password : </label>
                        <input type="password" name="repassword" id="repassword"/>
                    </li>
                    <li>
                        <button type="submit" class="btn btn-default">Register!</button>
                    </li>
                    <li>
                        <div>
                            Already have an account?
                            <a href="/#/signin"> Sign in!</a>
                        </div>
                    </li>
                </ul>
            </form>
        </div>
        </section>
        `;
    },
};

export default RegisterScreen;