Readme
This is my final year project that I did for desitation in my final year at university. There is still alot of improvement that can be done to be able to make this project deployable, but as it was my final year project it shall remain like this as I do plan to move on to other things.

1. Create Folder Structure
   . create root folder as ResturantComplete
   i. add frontend and backend folder
   ii. create src folder in frontend
   iii. create index.html with homepage in src
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

9. Admin Products
   . create Admin Order menu in header
   i. create ProductListScreen.js
   ii. show products with edit and delete button
   iii. show create product button
   iv. implement create product backend
10. Delete Product
    . update ProductListScreen.js
    i. handle delete button
    ii. rerender after deletion
    While writing the system code this resource were used to help implement the system, some of the routes were implemeted using styles obtained from these videos 1. https://www.youtube.com/playlist?list=PLpPqplz6dKxUaZ630TY1BFIo5nP-_x-nL 2. https://www.youtube.com/watch?v=b91XgdyX-SM&list=PLkPMK1452ETn4Jhd6luL2wSpfjifLLceN&index=6&t=580s 3. https://www.youtube.com/watch?v=37CLbUmFINs&list=PLkPMK1452ETn4Jhd6luL2wSpfjifLLceN&index=3 4. https://www.youtube.com/watch?v=TRttJdvX1Nk&list=PLkPMK1452ETlF2AufFfiTFU7saS0lm2AF&index=5&t=1796s
