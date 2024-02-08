const express = require('express');
const app = express.Router();
const aboutRoute = require('./about');
const adminLoginRoute = require('./adminLogin');
const userLoginRoute = require('./userLogin');
const contactRoute = require('./contact');
const logoutRoute = require('./logout');
const productsRoute = require('./products');
const registerRoute = require('./register');
const userRoute = require('./user');
const userDashboardRoute = require('./userDashboard');
const adminDashboardRoute = require('./adminDashboard');
const viewCartRoute = require('./viewCart');
const addProductRoute = require('./addProduct');
const myCartRoute = require('./myCart');
const placeOrderRoute = require('./placeOrder');
const paymentRoute = require('./payment');


 



app.get('/', (req, res) => {
    res.render('index')
    
});
app.use('/user', userRoute);
app.use('/userLogin', userLoginRoute);
app.use('/adminLogin', adminLoginRoute);
app.use('/register', registerRoute);
app.use('/products', productsRoute);
app.use('/logout', logoutRoute);
app.use('/userDashboard', userDashboardRoute);
app.use('/adminDashboard', adminDashboardRoute);
app.use('/about', aboutRoute);
app.use('/contact', contactRoute);
app.use('/viewCart', viewCartRoute);
app.use('/addProduct', addProductRoute);
app.use('/myCart', myCartRoute);
app.use('/placeOrder', placeOrderRoute);
app.use('/payment', paymentRoute);


module.exports = app