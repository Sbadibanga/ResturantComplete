import { getCustomerInfo, getShipping, setShipping} from "../localStorage";
import CheckoutSteps from '../components/CheckoutSteps';
import { shipping } from "../api";
import { hideLoading, showLoading, showMessage } from "../utils";


const ShippingScreen = {
    after_render: () =>{
        document.getElementById("continue-btn").addEventListener("click", () =>{
            document.location.hash = '/payment'; 
        })
        document.getElementById('shipping-form').addEventListener
        ('submit', async (e) => {
            e.preventDefault();
            showLoading();
            const data = await shipping({
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                postcode: document.getElementById('postcode').value,
                country: document.getElementById('country').value
            });
            hideLoading();
            if(data.error){
                showMessage(data.error);
            }else{
                setShipping(data)
            }
            
        });
    },
    render: () => {
        const {firstname} = getCustomerInfo();
        if(!firstname){
            document.location.hash = '/';
        }
        const {address, city, postcode, country} = getShipping();
        return `
        
        <section class="menu-section">
        ${CheckoutSteps.render({step1: true, step2: true})}
        <div class="form-container">
            <form id="shipping-form">
                <ul class="form-items">
                    <li>
                    <h1>Shipping</h1>
                    </li>
                    <li>
                    <label for="address"> Address :</label>
                    <input type="text" name="address" id="address" value="${address}"/>
                    </li>
                    <li>
                    <label for="city"> City :</label>
                    <input type="text" name="city" id="city" value="${city}"/>
                    </li>
                    <label for="postcode"> Post Code :</label>
                    <input type="text" name="postcode" id="postcode" value="${postcode}"/>
                    </li>
                    <label for="country"> Country :</label>
                    <input type="text" name="country" id="country" value="${country}"/>
                    </li>
                    <li>
                        <button type="submit" class="btn btn-default">Add Address</button>
                    </li>
                    <li>
                        <button type="button" id="continue-btn" class="btn btn-default">Continue</button>
                    </li>
                </ul>
            </form>
        </div>
        </section>
        `;
    },
};

export default ShippingScreen;