const SigninScreen = {
    after_render: () =>{},
    render: () =>`
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
        `,
};

export default SigninScreen