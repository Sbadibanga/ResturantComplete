import { getCustomerInfo, setPayment} from "../localStorage";
import CheckoutSteps from '../components/CheckoutSteps';


const PaymentScreen = {
    after_render: () =>{
        document.getElementById('payment-form').addEventListener
        ('submit', async (e) => {
            e.preventDefault();
            const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
            setPayment({
                paymentMethod
            });
            document.location.hash = '/placeorder';
        });
    },
    render: () => {
        const {firstname} = getCustomerInfo();
        if(!firstname){
            document.location.hash = '/';
        }
        return `
        
        <section class="menu-section">
        ${CheckoutSteps.render({step1: true, step2: true, Step3: true})}
        <div class="form-container">
            <form id="payment-form">
                <ul class="form-items">
                    <li>
                    <h1>Payment</h1>
                    </li>
                    <li>
                        <div>
                            <input type= "radio" name="payment-method" id="paypal" value="Paypal" checked/>
                            <label for="paypal">PayPal</label>
                        </div>
                    </li>
                    <li>
                        <div>
                            <input type= "radio" name="payment-method" id="stripe" value="Stripe"/>
                            <label for="stripe">Stripe</label>
                        </div>
                    </li>
                    <li>
                        <button type="submit" class="btn btn-default">Continue</button>
                    </li>
                </ul>
            </form>
        </div>
        </section>
        `;
    },
};

export default PaymentScreen;