Readme

1. Create Folder Structure
   . create root folder as ResturantComplete
   i. add frontend and backend folder
   ii. create src folder in frontend
   iii. create index.html with heading Athome in src
   iv. run npm init in frontend folder
   v. npm install live-server
   vi. add start command as live-server src --verbose
   vii. run npm start
   viii. check result
2. Create Static Home Screen
   . create ul.products
   i. create li
   ii. create div.product
   iii. add .product-image, .product-name, .product-brand, .product-price
   iv. style ul.products and internal divs
   v. duplicate 9 times to show 9 products
3. Render Dynamic Home Screen
   . create data.js
   i. export an array of 9 products
   ii. create screens/HomeScreen.js
   iii. export HomeScreen as an object with render() method
   iv. implement render()
   v. import data.js
   vi. return products mapped to list inside an ul
   vii. create app.js
   viii. link it to index.html as module
   ix. set main id to main-container
   x. create router() function
   xi. set main_container innerHTML to HomeScreen.render()
   xii. set load event of window to router() function
4. Build Url Router
   . create routes as route:screen object for home screen
   i. create utils.js
   ii. export parseRequestURL()
   iii. set url as hash address split by slash
   iv. return resource, id and verb of url
   v. update router()
   vi. set request as parseRequestURL()
   vii. build parsedUrl and compare with routes
   viii. if route exists render it, else render Error404
   ix. create screens/Error404.js and render error message
5. Create Node.JS Server
   . run npm init in root ResturantComplete folder
   i. npm install express
   ii. create server.js
   iii. add start command as node backend/server.js
   iv. require express
   v. move data.js from frontend to backend
   vi. create route for /api/products
   vii. return products in data.js
   viii. run npm start
6. Load Products From Backend
   . edit HomeScreen.js
   i. make render async
   ii. fetch products from '/api/products' in render()
   iii. make router() async and call await HomeScreen.render()
   iv. use cors on backend
   v. check the result
7. Add Webpack
   . cd frontend
   i. npm install -D webpack webpack-cli webpack-dev-server
   ii. npm uninstall live-server
   iii. "start": "webpack-dev-server --mode development --watch-content-base --open"
   iv. move index.html, style.css and images to frontend folder
   v. rename app.js to index.js
   vi. update index.html
   vii. add <script src="main.js"></script> before
   viii. npm start
   ix. npm install axios
   x. change fetch to axios in HomeScreen
8. Install Babel For ES6 Syntax
   . npm install -D babel core, cli, node, preset-env
   i. Create .babelrc and set presets to @babel/preset-env
   ii. npm install -D nodemon
   iii. set start: nodemon --watch backend --exec babel-node backend/server.js
   iv. convert require to import in server.js
   v. npm start
9. Enable Code Linting
   . npm install -D eslint
   i. install VSCode eslint extension
   ii. create .eslintrc and set module.exports for env to node
   iii. Set VSCode setting for editor.codeActionsOnSave source.fixAll.eslint to true
   iv. check result for linting error
   v. npm install eslint-config-airbnb-base and eslint-plugin-import
   vi. set extends to airbnb-base
   vii. set parserOptions to ecmaVersion 11 and sourceType to module
   viii. set rules for no-console to 0 to ignore linting error
10. Install VSCode Extension
    . JavaScript (ES6) code snippets
    i. ES7 React/Redux/GraphQL/React-Native snippets
    ii. Prettier - Code formatter
    iii. HTML&LESS grammar injections
11. Create Rating Component
    . create components/Rating.js
    i. link to fontawesome.css in index.html
    ii. create div.rating
    iii. define Rating object with render()
    iv. if !props.value return empty div
    v. else use fa fa-star, fa-star-half-o and fa-star-o
    vi. last span for props.text || ''
    vii. style div.rating, span and last span
    viii. Edit HomeScreen
    ix. Add div.product-rating and use Rating component
12. Product Screen
    . get product id from request
    i. implement /api/product/:id api
    ii. send Ajax request to product api
13. Product Screen UI
    . create back to result link
    i. create div.details with 3 columns
    ii. column 1 for product image
    iii. column 2 for product information
    iv. column 3 form product action
    v. style .details and all columns
    vi. create add to cart button with add-button id
14. Product Screen Action
    . after_render() to add event to the button
    i. add event handler for the button
    ii. redirect customer to cart/:product_id
    iii. implement after_render in index.js
15. Add To Cart Action
    . create CartScreen.js
    i. parseRequestUrl
    ii. getProduct(request.id)
    iii. addToCart
    iv. getCartItems
    v. cartItems.find
    vi. if existItem update qty
    vii. else add item
    viii. setCartItems
16. Cart Screen UI
    . cartItems = getCartItems()
    i. create 2 columns for cart items and cart action
    ii. cartItems.length === 0 ? cart is empty
    iii. show item image, name, qty and price
    iv. cart action
    v. Subtotal
    vi. Proceed to Checkout button
    vii. Add CSS Style
17. Update and Delete Cart Items
    . add qty select next to each item
    i. after_render()
    ii. add change event to qty select
    iii. getCartItems() and pass to addToCart()
    iv. set force to true to addToCart()
    v. create rerender() as (component, areaName = 'content')
    vi. component.render and component.after_render
    vii. if force is true then rerender()
    viii. add delete button next to each item
    ix. add click event to qty button
    x. call removeFromCart(deleteButton.id)
    xi. implement removeFromCart(id)
    xii. setCartItems( getCartItems().filter)
    xiii. if id === parseRequestUrl().id? redirect to '/cart'
    xiv. else rerender(CartScreen);
18. Connect To MySql and Create Admin customer
    . npm install MySql2 and sequelize and sequelize/cli
    i. run npx sequelize init connect to database
    iii. npm install dotenv
    iv. export db variables
    v. create models/customer.js
    vi. create Customer Table
    vii. create customerRoute
    viii. create createadmin route
19. Sign-in Screen UI 2. create SigninScreen 3. render email and password fields 4. style signin form
20. Sign-in Screen Backend 3. create signin api in backend 4. create route for /api/customers/signin 5. create check customer name and password 6. if it is not ok the return 401 error 7. install express-async-handler 8. wrap it in expressAsyncHandler 9. add error middleware in server.js 10. install Postman 11. send post request 12. test with invalid customer password 13. otherwise generate token 14. install jsonwebtoken 15. set config.JWT_SECRET to somethingsecret 16. add generateToken to utils.js 17. return token 18. test with correct customer and password
21. Sign-in Screen Action
    . after_render handle form submit
    i. create signin request in frontend
    ii. show alert if email or password is incorrect
    iii. Add getcustomerInfo and setCustomerInfo to localStorage
    iv. create Header component
    v. if customerInfo.email exist show customer name otherwise show signin
22. Create Progress Indicator and Alert Component
    . create overlay loading div in index.html
    i. Style overlay loading
    ii. create showLoading() function
    iii. set loading-overlay classList add active
    iv. create hideLoading() function
    v. create overlay message div in index.html
    vi. add style overlay message
    vii. create showMessage(message, callback)
    viii. document message-overlay set inner HTML
    ix. div > div id message-overlay-content
    x. show message
    xi. button id message-overlay-close-button OK
    xii. add class active to it
    xiii. add event listener for button to call callback
23. Register Screen
    . create RegisterScreen.js
    i. add form elements
    ii. after_render handle form submit
    iii. create register request in frontend
    iv. create register api in backend
24. customer Profile Screen
    . create ProfileScreen.js
    i. add form elements
    ii. after_render handle form submit
    iii. create profile update request in frontend
    iv. create profile update api in backend
    v. create isAuth in utils.js and use in update profile
    vi. implement sign out
25. Checkout Wizard
    . create CheckoutSteps.js
    i. create div elements for step 1 to 4
    ii. create redirectcustomer() in utils.js
    iii. copy profile screen and as shipping screen
    iv. use CheckoutStep
    v. define getShipping and setShipping
    vi. copy shipping screen and as payment screen
    vii. define getPayment and setPayment
    viii. redirect customer to PlaceOrder.js
26. PlaceOrder Screen UI
    . create PlaceOrder.js
    i. style elements
27. PlaceOrder Screen Action
    . handle place order button click
    i. createOrder api
    ii. create orderModel
    iii. create orderRouter
    iv. create post order route
28. Order Screen
    . create OrderScreen.js
    i. style elements
29. Display Orders History
    . create customer orders api
    i. create api for getMyOrders
    ii. show orders in profile screen
    iii. style orders
30. Admin Products
    . create Admin Order menu in header
    i. create ProductListScreen.js
    ii. show products with edit and delete button
    iii. show create product button
    iv. implement create product backend
31. Delete Product
    . update ProductListScreen.js
    i. handle delete button
    ii. rerender after deletion
    While writing the system code this resource were used to help implement the system, some of the routes were implemeted using styles obtained from these videos 1. https://www.youtube.com/playlist?list=PLpPqplz6dKxUaZ630TY1BFIo5nP-_x-nL 2. https://www.youtube.com/watch?v=b91XgdyX-SM&list=PLkPMK1452ETn4Jhd6luL2wSpfjifLLceN&index=6&t=580s 3. https://www.youtube.com/watch?v=37CLbUmFINs&list=PLkPMK1452ETn4Jhd6luL2wSpfjifLLceN&index=3
